import jwt from 'jsonwebtoken';

const generateToken = (res, userId, roles) => {
  const token = jwt.sign(
    {
      userInfo: {
        userId,
        roles
      }
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d'}
  )

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  })

}

export default generateToken