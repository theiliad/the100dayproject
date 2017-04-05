var Comment = React.createClass({
    getInitialState: function() {
        return {edit: false};
    },

    edit: function() {
        console.log("Edit Clicked");

        this.setState({edit: true});
    },

    remove: function() {
        console.log("Remove Clicked");

        this.props.removeComment(this.props.index);
    },

    save: function() {
        console.log("Save Clicked");

        var val = this.refs.editedComment.value;
        console.log(val);

        this.setState({edit: false});

        this.props.updateComment(val, this.props.index);
    },

    getHeader: function() {
        var author_short;
        var imageURL;

        if (this.props.author) {
            author_short = this.props.author.split(" ").join("").toLowerCase();
            imageURL = "img/" + author_short + ".jpg";
        } else {
            author_short = "";
            imageURL = "";
        }

        return (
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img src={imageURL} alt={this.props.author} className="profile" />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">{this.props.author}</p>
                    <p className="subtitle is-6">@{author_short}</p>
                </div>
            </div>
        )
    },

    renderComment: function() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        {this.getHeader()}

                        <div className="content">
                            {this.props.children}
                            <br />
                            <small>11:09 PM - 1 Jan 2016</small>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item" onClick={this.edit}>Edit</a>
                        <a className="card-footer-item" onClick={this.remove}>Delete</a>
                    </footer>
                </div>
            </div>
        )
    },

    renderEdit: function() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        {this.getHeader()}

                        <div className="content">
                            <textarea ref="editedComment" defaultValue={this.props.children}></textarea>
                            <br />
                            <small>11:09 PM - 1 Jan 2016</small>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item" onClick={this.save}>Save</a>
                        <a className="card-footer-item" onClick={this.remove}>Delete</a>
                    </footer>
                </div>
            </div>
        )
    },

    render: function() {
        if (!this.state.edit) {
            return this.renderComment();
        } else {
            return this.renderEdit();
        }
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {
            comments: [
                {author: "John Smith", text: "Great Post"},
                {author: "Jane Doe", text: "I loved the comparisons you made here!"},
                {author: "Mike Shaw", text: "Keep it up"}
            ]
        }
    },

    removeComment: function(i) {
        console.log("Removing Comment", i);

        var commentsArray = this.state.comments;
        commentsArray.splice(i, 1);

        this.setState({comments: commentsArray});
    },

    updateComment: function(editedComment, i) {
        console.log("Updating Comment", i);

        var commentsArray = this.state.comments;
        commentsArray[i].text = editedComment;

        this.setState({comments: commentsArray});
    },

    commentRender: function(comment, i) {
        return (
            <Comment author={comment.author} index={i} updateComment={this.updateComment} removeComment={this.removeComment}>
                {comment.text}
            </Comment>
        )
    },

    render: function() {
        return (
            <div>
                {this.state.comments.map(
                    this.commentRender
                )}
            </div>
        )
    }
});

ReactDOM.render(<CommentBox />, document.getElementById('title'));