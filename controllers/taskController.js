import Task from '../models/taskModel.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    const userId = req.user.id;

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId }, 
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user.id; 
    const task = await Task.findOneAndDelete({ _id: id, user: userId }); 

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
