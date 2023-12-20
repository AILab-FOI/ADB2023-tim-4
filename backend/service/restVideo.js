const VideoDao = require("./videoDAO.js");

class RestVideo {

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





