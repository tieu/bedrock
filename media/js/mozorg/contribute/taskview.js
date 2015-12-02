$(function() {
    'use strict';

    var $stepOne = $('#step_one');
    var $thankYou = $('#thankyou');
    var $getFirefox = $('.get-firefox');
    var $downloadButton = $('.download-link');

    var $followButton = $('.follow-mozilla')
    var intentURL = $followButton.attr('href');

    var $signupTweetForm = $('#signup-tweet');

    // some tasks, like install Whimsy, required the user to be using Firefox
    if ($getFirefox.length > -1 && !isFirefox()) {
        $getFirefox.toggleClass('hidden');
    }

    /**
     * Waits for the initial tab/window to become visible, and then
     * proceeds to complete the relevant task step.
     */
    function handleVisibilityChange() {
        document.addEventListener('visibilitychange', function() {
            // we wait until our current tab is visible before
            // showing the thank you message.
            if (document.visibilityState === 'visible') {
                // toggles number to check mark display
                $stepOne.addClass('completed');
                taskComplete();

                document.removeEventListener('visibilitychange');
            }
        });
    }

    /**
     * Handles blur and focus events on the main window, and completes
     * the task step once the main window receives focus.
     */
    function handleFocusChange() {
        var taskCompleted = false;

        if (!taskCompleted) {
            // once our original window receives focus again, complete the task.
            window.onfocus = function() {
                taskComplete();
                $stepOne.addClass('completed');
            };
            // ensure this only happens once.
            taskCompleted = true;
        }
    }

    /**
     * Called once all steps of the task has been completed. This will
     * show the thank message and scroll it into view.
     */
    function taskComplete() {
        $thankYou.removeClass('visibly-hidden');
        $thankYou.attr('aria-hidden', 'false');
        $thankYou[0].scrollIntoView();
        $thankYou.focus();
    }

    /**
     * Completions steps after the install buttons was clicked
     */
    function installWhimsey() {
        // toggles number to check mark display
        $stepOne.toggleClass('completed');
        taskComplete();
    }

    /**
     * Opens a new scaled window that allows a user to follow
     * @StartMozilla on Twitter.
     */
    function followMozilla() {
        window.open(intentURL, 'twitter', 'width=550,height=480,scrollbars');
        // when opening the above window, we cannot use the page visiblility
        // API to determine when our main window recieves focus, as the API only
        // works when the entire window is obscured, such as when you open a new tab.
        handleFocusChange();
    }

    $downloadButton.on('click', function(event) {
        // the above will open one of the app stores in a new tab
        // we only want to check the step and show the thank you
        // message once our tab is visible again.
        handleVisibilityChange();
    });

    // only bind the handler when the form exists
    if ($signupTweetForm.length > 0) {

        var $tweetField = $('#tweet_txt');
        var $charCount = $('.char-count');
        var maxLength = 140;
        var tweetLength = $tweetField.val().length;

        // get and show the initial number of characters
        $charCount.text(maxLength - tweetLength);

        $tweetField.on('keyup', function() {
            tweetLength = $tweetField.val().length;
            $charCount.text(maxLength - tweetLength);
        })

        $signupTweetForm.on('submit', function(event) {
            event.preventDefault();

            var tweetIntentURL = $signupTweetForm.attr('action');
            var tweetContent = $tweetField.val();
            var hashTag = $('#hashtag').attr('value');
            var tweet = encodeURI(tweetIntentURL + '?text=' + tweetContent + '&hashtags=' + hashTag);

            window.open(tweet, 'twitter', 'width=550,height=480,scrollbars');

            handleFocusChange();
        });
    }

    $stepOne.on('click', function(event) {

        var className = event.target.className;

        if (className === 'install-whimsey') {
            event.preventDefault();
            installWhimsey();
        } else if (className === 'watch-joc') {
            event.preventDefault();
            playJOC();
        }  else if (className === 'follow-mozilla') {
            event.preventDefault();
            followMozilla();
        } else if (className === 'build-firefox' || className === 'devtools') {
            handleVisibilityChange();
        }
    });

});
