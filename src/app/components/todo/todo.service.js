export class TodoService {
  constructor($window, $q) {
    this.indexedDB = $window.indexedDB;
    this.db = null;
    this.lastIndex = 0;
    this.$q = $q;
  }
  setDb (db) {
    this.db = db;
  }
  open () {
    const deferred = this.$q.defer();
    const version = 1;
    const request = indexedDB.open("todoData", version);

    request.onupgradeneeded = e => {
      this.setDb(e.target.result);

      e.target.transaction.onerror = indexedDB.onerror;

      if (this.db.objectStoreNames.contains("todo")) {
        this.db.deleteObjectStore("todo");
      }

      var store = this.db.createObjectStore("todo", {
        keyPath: "id"
      });
    };

    request.onsuccess = e => {
      this.setDb(e.target.result);
      deferred.resolve('OK');
    };

    request.onerror = () => {
      deferred.reject();
    };

    return deferred.promise;
  };

  getTodos () {
    const deferred = this.$q.defer();

    if (this.db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      const trans = this.db.transaction(["todo"], "readwrite");
      const store = trans.objectStore("todo");
      const todos = [];

      // Get everything in the store;
      const keyRange = IDBKeyRange.lowerBound(0);
      const cursorRequest = store.openCursor(keyRange);

      cursorRequest.onsuccess = e => {
        const result = e.target.result;
        if (result === null || result === undefined) {
          deferred.resolve(todos.sort((a, b) => {
            let comp = 0;
            if (a.index > b.index) comp = 1;
            if (a.index < b.index) comp = -1;
            return comp;
          }));
        } else {
          todos.push(result.value);
          if (result.value.id > this.lastIndex) {
            this.lastIndex = result.value.id;
          }
          result.continue();
        }
      };

      cursorRequest.onerror = e => {
        deferred.reject("Something went wrong!!!");
      };
    }

    return deferred.promise;
  };

  deleteTodo (id) {
    const deferred = this.$q.defer();

    if (this.db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      const trans = this.db.transaction(["todo"], "readwrite");
      const store = trans.objectStore("todo");

      const request = store.delete(id);

      request.onsuccess = e => {
        deferred.resolve();
      };

      request.onerror = e => {
        deferred.reject("Todo item couldn't be deleted");
      };
    }

    return deferred.promise;
  };

  updateTodo (todo) {
    const deferred = this.$q.defer();

    if (this.db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      const trans = this.db.transaction(["todo"], "readwrite");
      const store = trans.objectStore("todo");

      const request = store.put(todo);

      request.onsuccess = e => {
        deferred.resolve();
      };

      request.onerror = e => {
        deferred.reject("Todo item couldn't be updated");
      };
    }

    return deferred.promise;
  };

  addTodo (todo) {
    const deferred = this.$q.defer();

    if (this.db === null) {
      deferred.reject("IndexDB is not opened yet!");
    } else {
      const trans = this.db.transaction(["todo"], "readwrite");
      const store = trans.objectStore("todo");
      this.lastIndex++;
      const request = store.put({
        "id": this.lastIndex,
        "title": todo.title
      });

      request.onsuccess = e => {
        deferred.resolve();
      };

      request.onerror = e => {
        deferred.reject("Todo item couldn't be added!");
      };
    }
    return deferred.promise;
  };
}

TodoService.$inject = ['$window', '$q'];