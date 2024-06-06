//made by @domekisuzi at 2024/6/6:22:42
const fs = require('fs');
const path = require('path');

exports.getNews = (req, res) => {
    const filePath = path.join(__dirname, '../../healthcare_news/news_contents.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading news file:', err);
            return res.status(500).send({ message: 'Error reading news file' });
        }

        try {
            const news = JSON.parse(data);
            res.send(news);
        } catch (parseError) {
            console.error('Error parsing news file:', parseError);
            res.status(500).send({ message: 'Error parsing news file' });
        }
    });
};
