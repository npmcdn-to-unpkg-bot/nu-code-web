This is the front-end website for code.neumont.edu, my capstone project.

## Build steps

`git clone https://github.com/Tahler/code.neumont.edu`

`npm install`

`npm install -g angular-cli`

`npm start`

-------------------------------------------------------------------------------

Run `ng build -prod` to build for production.

See more instructions on the Angular CLI on
[their GitHub page](https://github.com/angular/angular-cli).

-------------------------------------------------------------------------------

# Known Bugs

- [ ] Deleting a test case in problem view can fail
  - Recreate bug by adding a test case, deleting the first then adding again

# TODO:

- [ ] Help / FAQ / changelog
  - [ ] Suggestion box - submit bug report, feature request, Lang request
- [ ] Indication of email sent
- [ ] Escape to cancel submission
- [ ] Upgrade to RC.5
- [ ] Stress test
- [ ] Change feedback level impl
  - Hints still optional property, with a "show errors?" bool
- [ ] Checkmark next to completed problems
- [ ] Spiff up profile page
  - [ ] Show placings in competitions
- [ ] "Podium" view on scoreboard after end
- [ ] User preferred language
- [ ] Search problems better
- [ ] Log in through other providers
- [ ] Ng2 animation loading
- [ ] CanDeactivate guard confirming you want to leave without submitting
- [ ] Limit leaderboard to one spot per person
- [ ] Open modal immediately with title on login required
- [ ] Redirect after login
- [ ] Competition exists / problem exists guards
  - Shows 404 if navigating to "/competitions/doesnotexist"
- [ ] Deleting problems and users moves to deleted object rather than actually deleting
- [ ] Unsubscribe observables onDestroy
- [ ] Caching
  - Repository service makes a lot of firebase requests
- [ ] Copyright
- [ ] Order problems
- [ ] Templates and highlighting lazy loaded
- [ ] Cleanup /usermgmt
  - [ ] Redirect to respective components based on action code
  - [ ] Create separate components for each action code
  - [ ] Two step verification
