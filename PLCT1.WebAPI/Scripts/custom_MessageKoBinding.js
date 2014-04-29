var urlBase = "http://localhost:51172/api/";

function Message(data) {
    this.messageId = ko.observable(data.MessageId);
    this.content = ko.observable(data.Content);
    this.datePosted = ko.observable(data.DatePosted);
    this.isStarred = ko.observable(data.Starred);
    var self = this;
    this.strDatePosted = ko.computed(function () {
        var d = new Date(self.datePosted());
        return d.toLocaleDateString() + " at " + d.toLocaleTimeString();
    });
}

function MessageListViewModel() {
    // Data
    var self = this;

    self.displayAll = ko.observable(); // if true, show starred and unstarred. otherwise only show starred.
    self.displayAll(true); // start out displaying all messages.
    self.onDisplayAllChanged = function () {
        // todo: fill this in!
    };
    self.messages = ko.observableArray([]);
    self.newMessageText = ko.observable();

    self.unstarredMessages = ko.computed(function () {
        return ko.utils.arrayFilter(self.messages(), function (message) { return !message.isStarred() });
    });
    self.starredMessages = ko.computed(function () {
        return ko.utils.arrayFilter(self.messages(), function (message) { return message.isStarred() });
    });

    // Operations
    self.loadData = function () {
        // Load initial state from server, convert it to Message instances, then populate self.messages.
        $.getJSON(urlBase + "Messages/", function (allData) {
            var mappedMessages = $.map(allData, function (item) { return new Message(item) });
            self.messages(mappedMessages);
        });

        self.newMessageText("");
    };

    self.addMessage = function () {
        var newMessage = new Message({ Content: self.newMessageText(), IsStarred: false, MessageId: 0, DatePosted: '1/1/2000' });

        //self.messages.push(newMessage); // this isn't really needed.

        $.post(urlBase + "Messages/", newMessage, function () {
            // need to then refresh all existing data - AFTER the add has completed.
            // reload all the messages (this will add in any messages added by other users since the last get)
            self.loadData();
        }, "json");
    };

    self.updateMessage = function (message) {
        var url = urlBase + "Messages/" + message.messageId();
        //     alert("updateing" + message.messageId() + message.isStarred() + url);

        var dataToSend = {
            MessageId: message.messageId,
            Content: message.content,
            DatePosted: message.datePosted,
            Starred: message.isStarred,
        };

        $.ajax({
            url: url,
            type: 'PUT',
            data: dataToSend,
            success: function (result) {
                // reload all the messages (this will add in any messages added by other users since the last get)
                self.loadData();
            }
        });
    }

    self.toggleStar = function (message) {
        message.isStarred(!message.isStarred());
        self.updateMessage(message);
    }

    self.removeMessage = function (message) {
        self.messages.remove(message);

        $.ajax({
            url: urlBase + "Messages/" + message.messageId(),
            type: 'DELETE',
            success: function (result) {
                // reload all the messages (this will add in any messages added by other users since the last get)
                self.loadData();
            }
        });
    };

    self.loadData();
};
