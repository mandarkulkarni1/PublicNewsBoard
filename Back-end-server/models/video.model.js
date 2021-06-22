module.exports = (sequelize, Sequelize) => {

    const Videos = sequelize.define("videos", {
      videoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      category: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.STRING,
      },
      city:{
          type:Sequelize.STRING
      },
      reporterId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
   
    
    });
    return Videos;
    };
