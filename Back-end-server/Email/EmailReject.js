const body = (name, reason, title) => {
    return (
        "<div>Hello " +
        name +
        " <br><br><br> <span></span> we find " +
        reason +
        " in your news ('" +
        title +
        "') post  so we can't publish it <br><br><br>" +
        "Please make changes . and you can repost it .<br><br> <br>Public News Report <br>stay home stay safe  <br> <br> <b>THIS IS COMPUTER GENERATED MAIL DON'T REPLY IT</b> <br>    </div>"
    );
};

module.exports = body;