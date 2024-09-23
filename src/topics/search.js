'use strict'; 

const _ = require('lodash');

const privilege = require('../privilege');
const plugins = require('../plugins');
const db = require('../database');
const { search } = require('.');

module.exports = function (Posts) {
    Posts.search = async function (data) {
        const query = data.query || ''; 
        const page = data.page || 1; 
        const pid = data.pid || 0; 
        const paginate = data.hasOwnProperty('paginate') ? data.paginate : true;
        const searchBy = data.searchBy || 'keywords'; 

        let pids = [];
        if (searchBy === 'keywords') {
            pids = await searchByKeywords(query);
        } 
        // Add other searchBy options here

        const result = await plugins.hooks.fire('filter:posts.search', { pids: pids, pid: pid});
        pids = result.pids;

        const searchResult = {
            matchCount: pids.length,
        };

        if (paginate) {
            const resultsPerPage = data.resultsPerPage || 50;
            const start = Math.max(0, page - 1) * resultsPerPage;
            const stop = start + resultsPerPage;
            searchResult.pageCount = Math.ceil(pids.length / resultsPerPage);
            pids = pids.slice(start, stop);
        }

        return searchResult; 
    }

    async function searchByKeywords(query) {
        const keywordsArr = query.split(' ');
        keywordsArr = keywordsArr.map(keyword => keyword.toLowerCase());
        const topics = await db.getSortedSetRevRange('post:pid', 0, -1);
        topics = topics.filter(topic => {
            keywordsArr.some(keyword => 
                topic.title.toLowerCase().includes(keyword) || 
                topic.content.toLowerCase().includes(keyword))
        })

        const pids = topics.map(topic => topic.pid);
        return pids;
    }
}; 


