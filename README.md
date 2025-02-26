# Google Drive Clone

You can view the deployed application [here](https://goog-drive-clone.netlify.app/).

## Technologies Used
- Next.js
- TypeScript
- Tailwind CSS
- PostHog (Analytics)
- SingleStore (Database)
- UploadThing (File Uploads)
- Clerk (Authentication and User Management)

## TODONE

- [x] Set up database and data model
- [x] Move folder open state to URL
- [x] Add auth
- [x] Add file uploading
- [x] Add analytics
- [x] Add "ownership" to files and folders
- [x] Upload files to the right folder
- [x] Allow files that aren't images to be uploaded
- [x] Make sure sort order is consistent
- [x] Add delete
- [x] Real homepage + onboarding

## Next Steps?

### Folder deletions

Make sure you fetch all of the folders that have it as a parent, and their children too

### Folder creations

Make a server action that takes a name and parentId, and creates a folder with that name and parentId (don't forget to set the ownerId).

### Access control

Check if user is owner before showing the folder page.

### Make a "file view" page

You get the idea. Maybe check out my last tutorial?

### Toasts!

### Gray out a row while it's being deleted
