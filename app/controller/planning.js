import {getAllModules, getPlanning} from "../model/module.js";

export default function index(app) {
    app.get('/planning/:start/:end', async (request, response) => {
        let cookies = request.headers.cookie;
        let start = request.params.start;
        let end = request.params.end;
        let classes = [];

        try {
            let json = await getPlanning(start, end, cookies);
            json.forEach((activity) => {
                classes.push({
                    activityTitle: activity["acti_title"],
                    allowRegister: activity["allow_register"],
                    allowedPlanningEnd: activity["allowed_planning_end"],
                    allowedPlanningStart: activity["allowed_planning_start"],
                    codeActivity: activity["codeacti"],
                    codeEvent: activity["codeevent"],
                    codeInstance: activity["codeinstance"],
                    codeModule: activity["codemodule"],
                    dates: activity["dates"],
                    display: activity["display"],
                    endDate: activity["end"],
                    eventRegistered: activity["event_registered"],
                    isRDV: activity["is_rdv"],
                    moduleAvailable: activity["module_available"],
                    moduleRegistered: activity["module_registered"],
                    numberGroup: activity["nb_group"],
                    numberHours: activity["nb_hours"],
                    numberEvent: activity["num_event"],
                    isPast: activity["past"],
                    Professor: activity["prof_inst"],
                    isProject: activity["project"],
                    room: activity["room"],
                    scholarYear: activity["scolaryear"],
                    semester: activity["semester"],
                    startDate: activity["start"],
                    title: activity["title"],
                    titleModule: activity["titlemodule"],
                    typeCode: activity["type_code"],
                    typeTitle: activity["type_title"],
                    totalStudentsRegistered: activity["total_students_registered"]
                })
            })
        } catch (e) {
            return response.status(400).json({error: "invalid format"});
        }
        return response.status(200).json(classes);
    })
}