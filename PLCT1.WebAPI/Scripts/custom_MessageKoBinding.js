var urlBase = "http://localhost:51172/api/";

function Message(data) {
    this.messageId = ko.observable(data.MessageId);
    this.content = ko.observable(data.Content);
    this.datePosted = ko.observable(data.DatePosted);
    this.isStarred = ko.observable(data.Starred);
}

function MessageListViewModel() {
    // Data
    var self = this;
    self.displayAll = ko.observable(); // if true, show starred and unstarred. otherwise only show starred.
    self.messages = ko.observableArray([]);

    self.newMessageText = ko.observable();

    self.unstarredMessages = ko.computed(function () {
        return ko.utils.arrayFilter(self.messages(), function (message) { return !message.isStarred() });
    });
    self.starredMessages = ko.computed(function () {
        return ko.utils.arrayFilter(self.messages(), function (message) { return message.isStarred() });
    });

    self.updateMessage = function (message) {
        $.ajax({
            url: '/script.cgi',
            type: 'PUT',
            data: message,
            success: function (result) {
                // reload all the messages (this will add in any messages added by other users since the last get)
            }
        });
    }

    // Operations
    self.loadData = function () {
        // Load initial state from server, convert it to Message instances, then populate self.messages.
        var self2 = self;
        $.getJSON(urlBase + "Messages/", function (allData) {
            alert("loading data3");
            var mappedMessages = $.map(allData, function (item) { return new Message(item) });
            self2.messages(mappedMessages);
        });

        self.newMessageText("");
    };

    self.addMessage = function () {
        var newMessage = new Message({ content: self.newMessageText() });
        self.messages.push(newMessage);
        $.post(urlBase + "Messages/", newMessage, function () {
            // need to then refresh all existing data...
            self.loadData();
        }, "json");

        //self.loadData();
    };

    // this needs to make a callback...
    self.removeMessage = function (message) {
        self.messages.remove(message);

        $.ajax({
            url: urlBase + "Messages/" + message.messageId(),
            type: 'DELETE',
            success: function (result) {
                // Do something with the result
                self.loadData();
            }
        });
    };

    self.loadData();
};
