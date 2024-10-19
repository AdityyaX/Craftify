import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'bson';
export const pubWebPage = {
    path: '/api/PublishPage/',
    method: 'post',
    handler: async (req, res) => {

       
        const { pageUri, websiteId } = req.body;

        try {
            const db = getDbConnection(process.env.API_DB_NAME);

            const result = await db.collection("web-pages").findOne({ "pageUri": '/' + pageUri, projectId: websiteId, published: true });

            res.status(200).json({ message: "WebPage Fetched", result })
        } catch (e) {
            res.status(500).json({ message: "Something went wrong" })
        }



    }
}