import  jwt  from "jsonwebtoken";

const generateToken = userId => {
    const accesToken = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "10d"})
    return accesToken
}
export {generateToken}