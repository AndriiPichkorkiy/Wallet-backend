
const getAll = async (req, res) => {
    const data = {
        message: "You make positive query. Success!"
    }
    res.json(data)
    
}

module.exports = getAll;