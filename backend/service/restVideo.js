const VideoDao = require("./videoDAO.js");

class RestVideo {

getContent = async function () {
    let vDao = new VideoDao();
    try {
        const videos = await vDao.fetchAll();
        return JSON.stringify(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error; // Optional: Rethrow the error if needed
    }
}

    getVideos= function (request, response) {
        response.type("application/json");
        response.status(200);
        let vDao = new VideoDao();
        vDao.fetchAll().then((videos) => {
            response.send(JSON.stringify(videos));
        });
    }


    getVideoById = function (request, response) {

        response.type("application/json");
        
        let vDao = new VideoDao();
        vDao.fetchById(request.params.id).then((video) => {
            if(video != null)
            {
                response.status(200);
                response.send(video);
            }
            else
            {
                response.status(500);
                response.send({greska : "korisnik ne postoji"})
            }
            
        });
    }

}

module.exports = RestVideo;





