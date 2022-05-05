import {
  Heading,
  Container,
  Input,
  IconButton,
  HStack,
  VStack,
  StackDivider,
  Checkbox,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { AddIcon } from "@chakra-ui/icons";
import { FormEvent, useState } from "react";
import { v4 } from "uuid";

type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

const Home: NextPage = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();
    if (!newTaskTitle) return;
    const newTask: Task = {
      id: v4(),
      title: newTaskTitle,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    return;
  };

  const handleCheckTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );
  };

  return (
    <Container centerContent maxW="container.sm" py="8">
      <VStack spacing={8}>
        <Heading>Planner</Heading>
        <HStack as="form" onSubmit={(event) => handleAddTask(event)}>
          <Input
            placeholder="New Task"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
          />
          <IconButton
            aria-label="add"
            icon={<AddIcon />}
            colorScheme="blue"
            type="submit"
          />
        </HStack>
        <VStack divider={<StackDivider />} align="start" w="full">
          {tasks.map((task) => {
            return (
              <Checkbox
                key={task.id}
                isChecked={task.isDone}
                onChange={() => handleCheckTask(task.id)}
              >
                {task.title}
              </Checkbox>
            );
          })}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Home;
