import {merge, of} from "rxjs";
import {ajax} from "rxjs/ajax";
import {map, catchError} from "rxjs/operators";

const githubApi = `https://api.github.com/search/repositories?q=`;
const gitlabApi = `https://gitlab.com/api/v4/projects?search=`;

const queryText = "awesome vue";

const githubApi$ = ajax.getJSON(`${githubApi}${queryText}`).pipe(
  map(userResponse => {
    console.log("githubApi Response:\n", userResponse);
  }),
  catchError(error => {
    console.log("githubApi:\n", error);
    return of(error);
  })
);

const gitlabApi$ = ajax.getJSON(`${gitlabApi}${queryText}`).pipe(
  map(userResponse => {
    console.log("gitlabApi Response:\n", userResponse);
  }),
  catchError(error => {
    console.log("gitlabApi:\n", error);
    return of(error);
  })
);

const apiRequests$ = merge(githubApi$, gitlabApi$).pipe();

apiRequests$.subscribe({
  error: err => console.log(err),
});
