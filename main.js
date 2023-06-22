const input = document.getElementById("input");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");

function renderItem(task, index = 0) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "off";
  const span = document.createElement("span");
  span.textContent = index + 1;
  const taskTitle = document.createTextNode(task.task);
  const button = document.createElement("button");
  button.textContent = "Delete";

	button.onclick = () => {
		fetch(`http://192.168.1.104:3000/todos/${task.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(() => {
				li.remove()

				const spans = document.querySelectorAll('span')

				spans.forEach((item, index) => {
					if(+item.textContent > index){
						item.textContent = index + 1
					}
				})

			})
	}

  div.append(span, taskTitle);
  li.append(div, button);
  return li;
}

fetch("http://192.168.1.104:3000/todos")
  .then((res) => res.json())
  .then((result) => {
    result.todos.forEach((todo, index) => {
      list.appendChild(renderItem(todo, index));
    });
  });

addBtn.onclick = () => {
  const taskTitle = input.value;

  fetch("http://192.168.1.104:3000/todos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: taskTitle }),
  })
		.then(res => res.json())
		.then(result => {
			const listItems = document.querySelectorAll('li')
			list.appendChild(renderItem(result.task, listItems.length))
		});
};
