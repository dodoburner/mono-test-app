import { makeAutoObservable, runInAction } from "mobx";
import CommentsService from "../common/services/CommentsService";

class CommentsStore {
  error = null;
  comments = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchComments(id) {
    try {
      const commentsService = new CommentsService();
      const data = await commentsService.fetchComments(id);
      runInAction(() => {
        this.comments = data;
      });
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }

  async deleteComment(id, token) {
    try {
      const commentsService = new CommentsService();
      const res = await commentsService.deleteComment(id, token);
      if (res.status === 204) {
        runInAction(() => {
          this.comments = this.comments.filter((el) => el.id !== id);
        });
      }
    } catch (err) {
      console.log("Error: ", err);
      runInAction(() => {
        this.error = err.message;
      });
    }
  }
}

const commentsStore = new CommentsStore();

export default commentsStore;
