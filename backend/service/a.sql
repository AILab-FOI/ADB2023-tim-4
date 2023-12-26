CREATE TABLE video (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  thumbnailPath VARCHAR(200) NOT NULL,
  videoPath VARCHAR(200) NOT NULL
);


INSERT INTO video (name, description, thumbnailPath, videoPath)
VALUES
  ('Zec', 'Dječji crtić', 'https://github.com/AILab-FOI/ADB2023-tim-4/blob/main/backend/library/thumbnails/zec.png?raw=true', 'zec.mp4'),
  ('Snowing Lofi', 'Opuštajuća muzika', 'https://github.com/AILab-FOI/ADB2023-tim-4/blob/main/backend/library/thumbnails/snowing%20lofi.png?raw=true', 'big.mp4'),
  ('N1 dnevnik', 'Decenija emisije 24 minuta', 'https://github.com/AILab-FOI/ADB2023-tim-4/blob/main/backend/library/thumbnails/dnevnik.png?raw=true', 'veliki_video.mp4'),
  ('3 Problems for Chinas New Fujian Aircraft Carrier', 'Video discusing problems of chinas new aircraft carriers', 'https://github.com/AILab-FOI/ADB2023-tim-4/blob/main/backend/library/thumbnails/%C4%8Detvrti.png?raw=true', 'četvrti.mp4'),
  ('Building a BMW S65 V8 From Scratch', 'From a bare block to a fully assembled engine -- thats the theme of this video as we build the glorious N/A S65B40 V8 engine for the E9x M3. Step-by-step engine assembly with detailed information, procedures, and torque specifications. Satisfaction guaranteed!', 'https://github.com/AILab-FOI/ADB2023-tim-4/blob/main/backend/library/thumbnails/peti.png?raw=true', 'peti.mp4'),
  (' "Influencers" Dangerous Airplane Advice ', 'Apparently being famous and rich doesnt mean you have common sense.', 'https://github.com/AILab-FOI/ADB2023-tim-4/blob/main/backend/library/thumbnails/%C5%A1esti.png?raw=true', 'šesti.mp4');


SELECT * FROM video;
DROP TABLE video