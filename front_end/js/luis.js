
luis_url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e00670ee-108f-4213-b364-e4258f5908ba?verbose=true&timezoneOffset=0&subscription-key=a414a73d67424877ababb5f64623e61c";

translateCommand = function (command, callback) {
    output = $.ajax({
        type: "GET",
        dataType: "json",
        url: luis_url,
        data: {
            q: command,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        crossDomain: true,
        success: callback
    });
};
