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


getTepitechResults -> command to retrive all Tepitech results with complete informations (distribution of points)\
getLastTepitechResult -> command to get last Tepitech result\
getTepitechGoal -> command to get the goal of the Tepitech score\
getEnglishModules -> command to retrive all modules of english of the year\
getEnglishModuleProjects -> command to retrieve all projects available in the english module\
getEnglishActivities -> command to retrieve all english activities


Catégorie e-learning :


selectElearningYear -> command to select preview year in the e-learning page\
selectElearningSemester -> command to select preview semester in the e-learning page\
selectElearningModule -> command to select preview module in the e-learning page\
selectElearningNotion -> command to select preview notion in the e-learning page\
getElearningNotionVideos -> command to retrieve all the videos available for the category of a notion of a module


Catégorie adminastration :


getAdministrationResource -> command to retrieve administration resource by the path given in argument


Catégorie notification :


getNotifications -> command that leads to a page where all the notifications are filled in\
getRecentNotifications -> command to retrieve all recent notifications