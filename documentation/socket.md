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
getGoalCredits -> command to retrieve the number of total credits to have\
getLogTime -> command to retrieve 'logtime' time

* weekly -> online time of the week
* monthly -> online time of the month
* yearly -> online time of the year
* custom -> online time between two chosen dates

getNotes -> command to retrieve all notes
* year -> all notes for a specific year
* module -> all notes of a module
* activity -> all notes for a specific activity (reviews / english ect...)

getGrades -> command to retrieve all grades of each module\
getFlags -> command to retrieve all flags obtains\
getFlagInfo -> command to see the description of the flag\
getAbsences -> command to retrieve all absences\
getRecentAbsences -> command to retrieve all recent absences\
getDocuments -> command to retrieve all documents\
openDocument -> command to open a document\
getProfilePicture -> command to retrieve the student's profile picture


Catégorie results :


selectResultYear -> command to select preview year in the result page\
selectResultModule -> command to select the module\
getResultProject -> command to retrieve the results of a project\
getResultDate -> commande to retrieve the date of the result\
getResultStatus -> commande to retrieve the status of a project (delivery error / crash ect...)\
getResultPercentage -> commande to retrieve the percentage of a project\
getResultCodingStyle -> commande to retrieve "Coding style" informations of a project\
getResultCoverage -> commande to retrieve coverage informations of a project\
getResultDetails -> command to retrieve the result details of a project\
getResultHistory -> command to retrieve the results history of a project


Catégorie roadblock :


getRoadblocks -> command to retrieve all roadblocks of the year\
getRoadblockInfo -> command to retrieve informations about a roadblock\
getRoadblockModules -> command to retrieve all modules of a roadblock\
getValidatedRoadlock -> command to retrieve all roadblocks validated\
getUnlockedRoadblocks -> command to retrieve the list of roadblocks still not unlocked\
getRoadblockCreditsToGet -> command to see how many credits necessary for the roadblock validation\
getRoadblockCreditsInProgress -> command to see how many credits are in progress in this roadblock\
getRoadblockCreditsMissing -> command to see how many credits are missing to validate the roadblock\
getRoadblockPossibleModules -> command to retrieve the list of modules that can help get the roadblock


Catégorie hub :


getHubXP -> command to see how many xp are validated\
getHubGoal -> command to see the objective of the number of xp to validate\
setHubGoal -> command to set the objective of the number of xp to validate\
getHubXPInProgress -> command to see the number of xp being validated (registration of the schedule)\
getHubXPMissing -> command to see the number of xp missing to achieve the goal\
getHubAttendances -> command to see the number of attendances in hub activity\
getHubAbsences -> command to see the number of absences in hub activity\
getHubActivities -> command to see hub activity organizations\ 
getJam -> command to see jam activities\
getJamResults -> command to retrieve all jam result


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