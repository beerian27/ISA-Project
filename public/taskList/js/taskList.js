let tasks = {
    0: {
        name: "Go for a run",
        description: "",
        isComplete: false
    },
    1: {
        name: "Finish lab 42",
        description: "This is due tonight",
        isComplete: false
    },
    2: {
        name: "make breakfast",
        description: "Eggs in the fridge",
        isComplete: true
    }
}

$(document).ready(() => {
    $("#loader").css("display", "none");
    $("#content").css("display", "block")
    let hasTasks = false;
    $("#addBtn").click(onClickAdd)
    $("#saveBtn").click(onClickSave);
    if (!hasTasks) {
        $("#prompt").html("You have no tasks!")
        $("#completedTasks").css("display", "none")
        $("#incompleteTasks").css("display", "none")
    } else {
        renderCurrentTasks(tasks);

    }

    console.log("rdy");
})

const renderCurrentTasks = (tasks) => {
    $("#prompt").html("Let's Be Productive")
    let taskArr = Object.entries(tasks);
    let taskList = taskArr.map(ele => {
        return ele[1];
    });
    console.log(taskList);

    for (let i = 0; i < taskList.length; i++) {
        console.log(taskList[i].isComplete);
        if (taskList[i].isComplete) {
            $("#completedTasks").append(`<div class="completed bg-success">
                <p class="description"><span class="taskName">${taskList[i].name}</span> - ${taskList[i].description}</p>
                </div>`)
        } else {
            $("#incompleteTasks").append(`<div class="todoTaskContainer task-${i}-container bg-info input-group mb-3">
                <div class="input-group-prepend">
                    <div class="checkbox-${i} checkbox input-group-text">
                        <input type="checkbox" class="checkbox-${i}"aria-label="Checkbox for following task">
                    </div>
                </div>
                <div class="todoTask task-${i}">
                    <span class="taskName">${taskList[i].name}</span> - ${taskList[i].description}
                </div>
            </div>`);

            $(`input.checkbox-${i}`).change(() => {
                $(`div.task-${i}-container`).remove();
                $("#completedTasks").append(`<div class="completed bg-success">
                <p class="description"><span class="taskName">${taskList[i].name}</span> - ${taskList[i].description}</p>
                </div>`)
            });

        }
    }

}

const onClickAdd = (() => {
    if ($("div.newTask").length == 0) {
        $("#saveBtn").css("display", "inline-block");
    } else if ($("div.newTask").length == 1) {
        $("#saveBtn").html("Save All");
    }
    $("#newTasksContainer").css("display", "block");
    $("#newTasksContainer").append(`            <div class="newTask">
    <p id="newTaskTitle">New Task</p>
    <div class="input-group mb-3 taskName">
        <span class="bg-info input-group-text">Task</span>
        <input required type="text" class="form-control task-name" aria-label="taskName" aria-describedby="taskName"
            placeholder="Go for a jog, read 15 pages, ...">
    </div>
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="bg-info input-group-text">Description</span>
        </div>
        <textarea
            placeholder="Does not need to be finished today, remember to set an alarm for 12 minutes, ..."
            class="form-control task-description" aria-label="taskDescription"></textarea>
    </div>
</div>`)

})

const onClickSave = (() => {
    // taskNames
    let taskNames = []
    $.each($("input.task-name"), (index, ele) => {
        taskNames.push($(ele).val());
        console.log(index, ele);
    });

    // taskDescriptions
    let taskDescs = [];
    $.each($("textarea.task-description"), (index, ele) => {
        taskDescs.push($(ele).val());
    });

    // tasks Object
    let tasks = [];
    $.each(taskNames, (index, ele) => {
        console.log(index, ele);
        if (ele.trim().length !== 0) {
            tasks.push({name: ele, description: taskDescs[index], isCompleted: false});
        }
    });

    let tasksObj = Object.assign({}, tasks);
    postTasks(tasksObj);
});

const postTasks = (tasks) => {
    let success = true;

    if (success) {
        $("#newTasksContainer").css("display", "none")
        $("#completedTasks").css("display", "block")
        $("#incompleteTasks").css("display", "block")
        $("#saveBtn").css("display", "none")
        $("div.newTask").remove();
        renderCurrentTasks(tasks)
    }
}