import { getUsers } from "../models/userModel.js"

export async function listarUsers(req, res) {
    const users = await getUsers()
    res.status(200).json(users)
}