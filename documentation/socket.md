catégorie connexion :

[CLIENT -> SERVER]

* loginStart -> start session
* loginPhone -> send phone number

[SERVER -> CLIENT]
* login -> each 5s the server send the information of the login session

Catégorie project :


getModules -> command to retrieve list of modules\
getModuleInfo -> command to retrieve information from a module\
getProjects -> command to retrieve the list of projects of a module\
getProjectInfo -> command to retrieve project information\
registerModule -> command to register for a module\
registerProject -> command to register for a project\
unRegisterModule -> command to unregister for a module\
unRegisterProject -> command to unregister for a project


catégorie profil :


getGPA -> command to retrieve gpa value\
getActualCredits -> command to retrieve the current number of credits\
getAvailableCredits -> command to retrieve the number of available credits\
getLogTime -> command to retrieve 'logtime' time

* weekly -> online time of the week
* monthly -> online time of the month
* yearly -> online time of the year
* custom -> online time between two chosen dates

getNotes -> command to retrieve all notes\
getFlags -> command to retrieve all flags obtains\
getAbsences -> command to retrieve all absences\
getDocuments -> command to retrieve all documents\


Catégorie roadblock :


getRoadblocks -> command to retrieve all roadblocks of the year\


Catégorie hub :


getHubXP -> command to see how many xp are validated\
getJam -> command to see jam activities\


Catégorie anglais :


getTepitech -> command to retrive all Tepitech results with complete informations (distribution of points)\
getEnglishModules -> command to retrive all modules of english of the year\
getEnglishActivities -> command to retrieve all english activities


Catégorie e-learning :


getVideos -> command to select preview year in the e-learning page


Catégorie adminastration :


getAdministrationResource -> command to retrieve administration resource by the path given in argument


Catégorie notification :


getNotifications -> command that leads to a page where all the notifications are filled in

Catégorie myEpitech :

getAllResults -> command to see all the results of your year given in argument\
getDetailsResult -> command to see the details of the results with the id of the result given in argument\
getAllResultsProject -> command to see all the results of the project given in argument\
