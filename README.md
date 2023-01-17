
# Assignment

### RUN
1. `npm install`
2.  `npm run dev`


### DOCS
1. `/search` : Searching the API with title or imdb id.
query params : title and imdbID 

Ex:: `/search?title=mimi` or `/search?imdbID=tt10895576`

2. `/update/:id` : Updates the movie with given fields in request body 

Ex:: `/update/63c6c9a91cc8d39c05f9308e`, body: {
        "Year":2010
    }

3. `/find` : Show top rate movies with year and source
query params : year and source

Ex:: `/find?year=2010&source=Internet Movie Database`

4. `/register` : registers the user. username and password are required in body.

Ex:: body: {
    "username":"username1",
    "password": "password"
}

5. `login` : provides jwt token for logIn.
Ex:: body: {
    "username":"username1",
    "password": "password"
}

Header for sending requests:
Authorisation: Bearer {token}
