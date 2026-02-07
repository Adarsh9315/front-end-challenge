import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container text-center mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to The Shoppies!</h1>
                <p className="lead">Nominate your favorite movies for the Shoppies awards.</p>
                <hr className="my-4" />
                <p>Search for movies and add them to your nomination list. You can nominate up to 5 movies.</p>
                <Link className="btn btn-primary btn-lg" to="/app" role="button">Start Nominating</Link>
            </div>
        </div>
    );
};

export default LandingPage;
