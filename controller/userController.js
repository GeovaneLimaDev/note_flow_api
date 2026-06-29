import { UserService } from "../service/userService.js"

export class UserController {
    static async getProfile(req, res, next) {
        try {
            const userId = req.userid

            const profile = await UserService.getProfile(userId)
            res.status(200).json(profile)
        } catch (err) {
            next(err)
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const userId = req.userid
            const newEmail = req.body.email 
            const newName = req.body.name 

            const message = await UserService.updateProfile(userId, newEmail, newName)
            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

    static async updadePassWord(req, res, next) {
        try {
            const newPassword = req.body.newPassword
            const currentPassword = req.body.currentPassword
            const userId = req.userid
            const message = await UserService.updatePassWord(userId, newPassword, currentPassword)
            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

    static async deleteProfile(req, res, next) {
        try {
            const userId = req.userid
            const password = req.body.password

            const message = await UserService.deleteProfile(userId,  password)
            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }
}