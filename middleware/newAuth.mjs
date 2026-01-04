import jwt from 'jsonwebtoken'

const newAuth = (roles) => {
    return (req, res, next) => {

        const token = req.header('Authorization')

        if (!token)
            return res.status(401).json({ message: 'No token, access denied' })

        try {

            const verified = jwt.verify(token.split(" ")[1], "shyam")
            console.log("VERIFIED:", verified)

            req.user = verified

            if (!roles.includes(req.user.role))
                return res.status(403).json({ message: 'Access denied' })

            next()
        }
        catch (error) {
            console.error("JWT ERROR:", error.message)
            return res.status(401).json({ message: 'Invalid token, access denied' })
        }
    }
}

export default newAuth
