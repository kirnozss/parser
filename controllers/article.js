const Article = require('../models/article')
const axios = require('axios');
const cheerio = require('cheerio')

const config = require('../config/keys')
const savePhoto = require('../libs/savePhoto')

exports.createArticle = async (req, res, next) => {
    try {
        //get 5 articles urls
        const articlesReq = await axios.get(config.URL,
            {
                headers: { 'User-Agent': config.BROWSER }
            })

        const $ = await cheerio.load(articlesReq.data, { decodeEntities: false })

        const linkList = []

        await $('.post-link').each((i, el) => {
            const link = $(el).attr('href')
            linkList.push(link)
        })

        lastArticles = [...linkList.slice(0, 5)]

        // parse articles

        for (let i = 0; i < lastArticles.length; i++) {

            const url = lastArticles[i]

            const response = await axios.get(url,
                {
                    headers: { 'User-Agent': config.BROWSER }
                })

            const $ = await cheerio.load(response.data, { decodeEntities: false })

            // save images
            const newImgsUrl = []

            const images = $('.post-content  img')
                .map((i, image) => $(image).attr('src'))
                .get()

            for (let i = 0; i < images.length; i++) {
                const name = Date.now().toString()
                await savePhoto(images[i], name)
                newImgsUrl.push('http://localhost:4000/photo/' + `${name}` + '.jpg')
            }

            // parse text
            const title = $("h1").text()
            const findTitle = $("h1").html()
            const reg = new RegExp(findTitle, 'g')

            const text = $(".post-content")
                .text()
                .replace(/\n/ig, ' ')
                .replace(/  /ig, '')
                .replace(/  /ig, '')
                .replace(reg, '')

            const data = {
                title,
                text,
                imgs: [...newImgsUrl]
            }

            const article = await Article.create({
                ...data
            })
        }

        res.status(201).json("ok")

    } catch (e) {
        console.log(e)
        next(e)
    }
}

const getPagination = (page, size) => {
    const limit = size ? +size : 2
    const offset = page ? page * limit : 0

    return { limit, offset }
}

exports.getArticles = async (req, res, next) => {
    try {

        const { page, size } = req.query;

        const { limit, offset } = getPagination(page, size);
        const articles = await Article.findAll({ limit, offset })

        const clone = JSON.parse(JSON.stringify(articles))

        for (let i = 0; i < clone.length; i++) {
            clone[i].text = clone[i].text.substr(0, 300)
        }

        res.status(200).json(clone)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.getArticleById = async (req, res, next) => {
    try {

        const article = await Article.findByPk(+req.params.id)

        res.status(200).json(article)

    } catch (e) {
        console.log(e)
        next(e)
    }
}
