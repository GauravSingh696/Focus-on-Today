const checkBox = document.querySelectorAll('.checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const error = document.querySelector('.error')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const para = document.querySelector('.para')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
).length

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
progress.innerText = allQuotes[completedGoalsCount]

if (completedGoalsCount == inputFields.length)
    para.innerText = `"Keep Going, You're making great progress!"`

checkBox.forEach((e) => {
    e.addEventListener('click', () => {
        const allGoalsAdded = [...inputFields].every(function (input) {
            return input.value
        })

        if (allGoalsAdded) {
            e.parentElement.classList.toggle('completed')
            const inputId = e.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

            progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
            progress.innerText = allQuotes[completedGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        } else {
            progressBar.classList.add('show-error')
        }


        if (completedGoalsCount == inputFields.length)
            para.innerText = `"Keep Going, You're making great progress!"`
        else
            para.innerText = `"Move one step ahead, today!"`
    })
})

inputFields.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }

        if (allGoals[input.id]) {
            allGoals[input.id].name = input.value
        } else {
            allGoals[input.id] = {
                name: input.value,
                completed: false,
            }
        }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})

