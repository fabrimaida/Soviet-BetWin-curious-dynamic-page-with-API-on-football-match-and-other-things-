
function addGetStadiumsListener() {

    let target = $('#getStadiums');
    target.click(getStadiums);
}
function addGetChannelsListener() {

    let target = $('#getChannels');
    target.click(getChannels);
}
function addGetGroupsListener() {

    let target = $('#getGroups');
    target.click(getGroupsAdv);
}
function addGetKnockOutsListener() {

    let target = $('#getKnockouts');
    target.click(getKnockOuts);
}

$(document).on("click","#buttonImg",printImg);

function printImg() {
  let imgBoxOn = $(this).parent().find("#imgStadium").removeClass("hidden");
  let imgBox = $(this).parent().find("#imgStadium")
  let stadiumId = $(this).parent().find(".stadium").data("value");
  let imgBtn = $(this);
  let arrayImgBox = [];

      $.ajax({

          url: `https://myfakeapi.com/api/football/stadiums/${stadiumId}`,
          method: 'GET',
          success: function(data) {

              let imgUrl = data.stadium.image;

              arrayImgBox.push(imgUrl);
              imgBox.attr("src", arrayImgBox[0] );
          }
      });
  };

function getStadiums() {

    $.ajax({

        url: 'https://myfakeapi.com/api/football/stadiums',
        method: 'GET',
        success: function(data) {

            let target = $('ul#target');
            target.html('');

            let stadiums = data.stadiums;

            let template = $('#stadiumLayout').html();
            let compile = Handlebars.compile(template);

            for (let x=0;x<stadiums.length;x++) {

                let stadium = stadiums[x];
                let html = compile(stadium);
                target.append(html);
            }
        }
    });
}

function getChannels() {

    $.ajax({

        url: 'https://myfakeapi.com/api/football/tvchannels',
        method: 'GET',
        success: function(data) {

            let target = $('ul#target');
            target.html('');

            let tvchannels = data.tvchannels;

            let template = $('#tvchannelsLayout').html();
            let compile = Handlebars.compile(template);

            for (let x=0;x<tvchannels.length;x++) {

                let tvchannel = tvchannels[x];

                let lang = tvchannel.lang[0];
                if (lang == 'en')
                    tvchannel.enFlag = true;

                let html = compile(tvchannel);
                target.append(html);
            }

        }
    });
}
function getGroups() {

    $.ajax({

        url: 'https://myfakeapi.com/api/football/groups',
        method: 'GET',
        success: function(data) {

            printGroups(data.Groups);
        }
    });
}
function getGroupsAdv() {

    $.ajax({

        url: 'https://myfakeapi.com/api/football/groups',
        method: 'GET',
        success: function(data) {

            printGroupsAdv(data.Groups);
        }
    })
}
function getKnockOuts() {

    $.ajax({

        url: 'https://myfakeapi.com/api/football/knockouts',
        methods: 'GET',
        success: function(data) {

            printKnockOuts(data.Knockouts);
        }
    })
}

function printKnockOuts(knockouts) {

    let target = $('#target');
    target.html('');

    let template = $('#knockOutsLayout').html();
    let compile = Handlebars.compile(template);

    for (const key in knockouts) {

        let knockout = knockouts[key];

        let html = compile(knockout);
        target.append(html);
    }

    printTeams();
    printStadiums();
    printChannels();
}
function printTeams() {

    let spans = $('.team');
    spans.each((index, element) => {

        let jqElem = $(element);
        let teamId = jqElem.data('value');

        $.ajax({

            url: `https://myfakeapi.com/api/football/teams/${teamId}`,
            method: 'GET',
            success: function(data) {

                let teamName = data.Team.name;
                jqElem.text(`${teamName}`);
            }
        });
    });
}
function printStadiums() {

    let spans = $('.stadium');
    spans.each((index, element) => {

        let jqElem = $(element);
        let stadiumId = jqElem.data('value');

        $.ajax({

            url: `https://myfakeapi.com/api/football/stadiums/${stadiumId}`,
            method: 'GET',
            success: function(data) {

                let name = data.stadium.name;
                jqElem.text(name);
            }
        });
    });
}
function printChannels() {

    let lis = $('.channels li');
    lis.each((index,element) => {

        let jqElem = $(element);
        let channelId = jqElem.data('value');

        $.ajax({

            url: `https://myfakeapi.com/api/football/tvchannels/${channelId}`,
            method: 'GET',
            success: function(data) {

                let name = data.tvchannel.name;
                jqElem.text(name);
            }
        });
    });
}
function printGroups(groups) {

    let target = $('#target');
    target.html('');

    let template = $('#groupsLayout').html();
    let compile = Handlebars.compile(template);

    for (const key in groups) {

        let group = groups[key];

        group.matchesHtml = getMatchesStr(group.matches);

        let html = compile(group);
        target.append(html);
    }
}

function getMatchesStr(matches) {

    let res = "";

    let template = $('#matchesLayout').html();
    let compile = Handlebars.compile(template);

    for (let x=0;x<matches.length;x++) {

        let match = matches[x];

        match.channelsHtml = getChannelsStr(match.channels);

        let html = compile(match);

        res += html;
    }

    return res;
}
function getChannelsStr(channels) {

    let res = '';

    let template = $('#channelsLayout').html();
    let compile = Handlebars.compile(template);

    for (let x=0;x<channels.length;x++) {

        let channel = channels[x];

        let html = compile(channel);
        res += html;
    }

    return res;
}

function printGroupsAdv(groups) {

    let target = $('#target');
    target.html('');

    let template = $('#groupsLayoutAdv').html();
    let compile = Handlebars.compile(template);

    for (const key in groups) {

        let group = groups[key];

        let matches = group.matches;

        let html = compile(group);
        target.append(html);
    }
    printStadiumsName();
    printChannelsName();
}
function printStadiumsName() {

    $('.stadium').each((i,e) => {

        const me = $(e);
        const value = me.data('value');
        console.log(value);
        $.ajax({

            url: `https://myfakeapi.com/api/football/stadiums/${value}`,
            method: 'GET',
            success: function(data) {

                me.text(data.stadium.name);
            }
        })
    });
}
function printChannelsName() {

    $('.channels').each((i,e) => {

        const me = $(e);
        let channel = me.data('value');
        $.ajax({

            url: `https://myfakeapi.com/api/football/tvchannels/${channel}`,
            method: 'GET',
            success: function(data) {

                me.text(data.tvchannel.name);
            }
        })
    })
}

function init() {

    getKnockOuts();

    addGetStadiumsListener();
    addGetChannelsListener();
    addGetGroupsListener();
    addGetKnockOutsListener();
}

$(init);
