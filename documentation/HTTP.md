# List of requests :

## Login :

```GET /LOGIN/START```

start login sessions

```GET /LOGIN/STATUS```

the status of the sessions

```GET /LOGIN/PHONE/{CODE}```

send the phone code of the login

## Profil :

### User :

Gets the username, email, promotion, year of study, track and location of a user from it's id

```GET /USER```

### Available Credits :

Gets the number of available credits of user for this year

```GET /USER/AVAILABLE_CREDITS```

### Credits :

Gets the number of credits of user for this year

```GET /USER/CREDITS```

### GPA :

Gets the GPA of user

```GET /USER/GPA```

### Netsoul :

Gets the informations related to logtime of user

```GET /USER/NETSOULD/{PARAMETERS}```

#### Parameters :

Period of time :

* Year
* Month
* Week

### Units and grade :

Gets the results of the units and grades of user

```GET /USER/RESULTS/{PARAMETERS}```

#### Parameters :

* All time
* Year
* Month
* Week
* semester number

### Flags :

Gets the flags of user

```GET /USER/FLAGS```

### Partners :

Gets the partners of a user

```GET /USER/PARTNERS/{PARAMETERS}```

#### Parameters :

* Year
* Month
* Week

### Educationnal overview :

Gets details about ?? of a user

```GET /USER/EDUCATIONNAL```

### Absences :

Gets the absences of a user

```GET /USER/ABSENCES/{PARAMETERS}```

#### Parameters :

* All time
* Year
* Month
* Week
* Unit ?

## Units :

### Units

Gets all the units of a user

```GET /UNITS/{PARAMETERS}```

#### Parameters :

* Current
* All time
* Year

### Unit

Gets the details of a specific unit

```GET /UNITS/{ID}```\
Where ``ID`` is the id of the unit
``ID`` is optionnal, if not specified it will return the details of all units.

### Register unit

Registers to a unit

```GET /UNITS/{ID}/REGISTER```\
Where ``ID`` is the id of the unit

### Unregister from a unit

```GET /UNITS/{ID}/UNREGISTER```\
Where ``ID`` is the id of the unit

## Projects :

### Projects

Gets all the projects of a user

```GET /USER/UNITS/{PARAMETERS}```

#### Parameters :

* Current
* All time
* Year

### Project

Gets the details of a project from his id

```GET /PROJECTS/{ID}```\
Where ``ID`` is the id of the project
``ID`` is optionnal, if not specified it will return the details of all projects.

### Register project

Registers to a project

```POST /PROJECTS/{ID}/REGISTER```\
Where ``ID`` is the id of the project

### Unregister from a project

```GET /PROJECT/{ID}/UNREGISTER```\
Where ``ID`` is the id of the project

## Roadblock :

### Roadblocks :

Gets the roadblocks of a user

```GET /ROADBLOCKS/{PARAMETERS}```\
Where ``PARAMETERS`` is optional

#### Parameters :

* Completed
* NotCompleted
* Year

### Roadblock :

Gets the details of a roadblock (number of missing credits, modules of the roadblock...) from his id

```GET /ROADBLOCKS/{ID}```\
Where ``ID`` is the id of the roadblock\
If no ``ID`` is specified gets all the roadblocks details

## English :

### Tepiteks

Gets the all the tepitek results of a user

```GET /TEPITEK/{PARAMETERS}```\
Where ``PARAMETERS`` is optional

#### Parameters :

* Year
* Last

### English units

Gets all the currently available units of english

```GET /ENGLISH/```

### English projects

Gets all the currently available project of a unit of english

```GET /ENGLISH/PROJECTS/{ID}```\
Where ``ID`` is the id of the unit\
If no ``ID`` is specified returns all the available english projects

## HUB :

### XP

Gets the xp details of a user (goal, current xp)

```GET /HUB/XP```

### JAM

Gets the jam results of a user

```GET /JAM```

## E-Learning :

### Videos

Gets the videos of the elearning

```GET /VIDEOS/{PARAMETERS}```\
Where ``PARAMETERS`` is optional, if no parameter,
the request send all videos available for user

#### Parameters :

* Year
* Month
* Module
* Project

## Administration :

### Public documents

Get the public documents of administration tab

```GET /PUBLIC_DOCUMENTS/```

## Notifications :

### Notifications :

Gets the notifications of a user

```GET /NOTIFICATIONS/{PARAMETERS}```
If no ``PARAMETERS`` is specified returns all notifications

#### Parameters :

* Read
* Not read
* Month
* Week

### Alert :

Gets the alert of the user

```GET /ALERT```

## Planning :

### Planning :
Gets the notifications of a user

```GET /PLANNING/{START}/{END}```\
``START`` departure date\
``END`` end date