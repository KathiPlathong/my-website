// ========================================
// 1. Array
// ========================================

let projects = [

    {
        name: "Website",
        technology: "HTML CSS"
    },

    {
        name: "Python Project",
        technology: "Python"
    },

    {
        name: "Todo App",
        technology: "JavaScript"
    },

    {
        name: "Portfolio",
        technology: "HTML CSS JavaScript"
    }

];



// ========================================
// 2. DOM
// ========================================

const projectList =
    document.querySelector("#projectList");


const projectName =
    document.querySelector("#projectName");


const technology =
    document.querySelector("#technology");


const addButton =
    document.querySelector("#addButton");


const searchProject =
    document.querySelector("#searchProject");


const filterButtons =
    document.querySelectorAll(
        ".filter-buttons button"
    );



// ========================================
// 3. State
// ========================================

// -1 หมายถึงไม่ได้อยู่ในโหมด Edit

let editIndex = -1;


// Technology ที่กำลังเลือก

let currentTechnology = "All";



// ========================================
// 4. Save Data
// ========================================

function saveProjects() {

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

}



// ========================================
// 5. Load Data
// ========================================

function loadProjects() {

    let data =
        localStorage.getItem("projects");


    if (data !== null) {

        projects =
            JSON.parse(data);

    }

}



// ========================================
// 6. Display Projects
// ========================================

function displayProjects(search = "") {

    // ล้างข้อมูลเก่าก่อน

    projectList.innerHTML = "";



    // ====================================
    // Filter
    // ====================================

    let filteredProjects =
        projects.filter(function(project) {


            // -------------------------------
            // Search
            // -------------------------------

            let matchSearch =

                project.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                project.technology
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );



            // -------------------------------
            // Technology Filter
            // -------------------------------

            let matchTechnology =

                currentTechnology === "All"

                ||

                project.technology
                    .toLowerCase()
                    .includes(
                        currentTechnology
                            .toLowerCase()
                    );



            // ต้องผ่านทั้ง Search
            // และ Technology

            return matchSearch &&
                   matchTechnology;

        });



    // ====================================
    // Empty State
    // ====================================

    if (filteredProjects.length === 0) {

        projectList.innerHTML =

            '<div class="empty-message">' +
            'No projects found.' +
            '</div>';

        return;

    }



    // ====================================
    // Display
    // ====================================

    filteredProjects.forEach(
        function(project) {


            // หา index จริงจาก Array

            let index =
                projects.indexOf(project);



            // สร้าง Card

            projectList.innerHTML +=

                '<div class="project-card">' +

                    '<h3>' +
                        project.name +
                    '</h3>' +

                    '<p>' +
                        'Technology: ' +
                        project.technology +
                    '</p>' +

                    '<button ' +
                        'onclick="editProject(' +
                        index +
                        ')">' +
                        'Edit' +
                    '</button> ' +

                    '<button ' +
                        'class="delete-button" ' +
                        'onclick="deleteProject(' +
                        index +
                        ')">' +
                        'Delete' +
                    '</button>' +

                '</div>';

        }
    );

}



// ========================================
// 7. Add / Update
// ========================================

addButton.addEventListener(
    "click",
    function() {


        // อ่านข้อมูลจาก Input

        let name =
            projectName.value.trim();


        let tech =
            technology.value.trim();



        // ====================================
        // Validation
        // ====================================

        if (name === "" || tech === "") {

            alert(
                "กรุณากรอกข้อมูลให้ครบ"
            );

            return;

        }



        // ====================================
        // Update
        // ====================================

        if (editIndex !== -1) {


            projects[editIndex].name =
                name;


            projects[editIndex].technology =
                tech;


            // กลับไปโหมด Add

            editIndex = -1;


            addButton.textContent =
                "Add Project";

        }



        // ====================================
        // Add
        // ====================================

        else {

            projects.push({

                name: name,

                technology: tech

            });

        }



        // บันทึกข้อมูล

        saveProjects();



        // แสดงข้อมูล

        displayProjects();



        // ล้าง Form

        projectName.value = "";

        technology.value = "";

        searchProject.value = "";

    }
);



// ========================================
// 8. Edit
// ========================================

function editProject(index) {


    // เก็บ index ที่กำลังแก้ไข

    editIndex = index;



    // เอาข้อมูลเดิมมาใส่ Input

    projectName.value =
        projects[index].name;


    technology.value =
        projects[index].technology;



    // เปลี่ยนข้อความปุ่ม

    addButton.textContent =
        "Update Project";



    // เลื่อนกลับขึ้นไปที่ Form

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ========================================
// 9. Delete
// ========================================

function deleteProject(index) {


    // ลบข้อมูลออกจาก Array

    projects.splice(index, 1);



    // บันทึกข้อมูลใหม่

    saveProjects();



    // แสดงข้อมูลใหม่

    displayProjects(
        searchProject.value
    );

}



// ========================================
// 10. Search
// ========================================

searchProject.addEventListener(
    "input",
    function() {


        displayProjects(
            searchProject.value
        );

    }
);



// ========================================
// 11. Technology Filter
// ========================================

filterButtons.forEach(
    function(button) {


        button.addEventListener(
            "click",
            function() {


                // อ่าน data-tech

                currentTechnology =
                    button.dataset.tech;



                // แสดงข้อมูล

                displayProjects(
                    searchProject.value
                );

            }
        );

    }
);



// ========================================
// 12. Start Program
// ========================================

loadProjects();

displayProjects();