const host = "ec2-63-35-226-22.eu-west-1.compute.amazonaws.com"
const port = 5000
const signupURL = `http://${host}:${port}/signup`
const loginURL = `http://${host}:${port}/login`
const itemsURL = `http://${host}:${port}/items`
const summaryURL = `http://${host}:${port}/summary`

export {signupURL, loginURL, itemsURL, summaryURL}