$(function() {
    'use strict';

    var $taskSteps = $('.task-steps');
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
     *
     */
    function completeStep($step) {
        var $stepOne = $('#step_one');
        var $stepTwo = $('#step_two');

        if ($step.data('step') === 'one') {
            $stepOne.toggleClass('completed');
        } else if ($step.data('step') === 'two') {
            $stepTwo.toggleClass('completed');
        }

        if ($step.data('complete') === true) {
            taskComplete();
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
     * Waits for the initial tab/window to become visible, and then
     * proceeds to complete the relevant task step.
     */
    function handleVisibilityChange($step) {
        $(document).on('visibilitychange.taskview', function() {
            // we wait until our current tab is visible before
            // showing the thank you message.
            if (document.visibilityState === 'visible') {
                completeStep($step);
                $(document).off('visibilitychange.taskview');
            }
        });
    }

    /**
     * Handles blur and focus events on the main window, and completes
     * the task step once the main window receives focus.
     */
    function handleFocusChange($step) {
        var taskCompleted = false;

        if (!taskCompleted) {
            // once our original window receives focus again, complete the task.
            window.onfocus = function() {
                completeStep($step);
            };
            // ensure this only happens once.
            taskCompleted = true;
        }
    }

    /**
     *
     */
    function initTweetForm() {
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

            var $submitButton = $('input[type="submit"]');
            var tweetIntentURL = $signupTweetForm.attr('action');
            var tweetContent = $tweetField.val();
            var hashTag = $('#hashtag').attr('value');
            var tweet = encodeURI(tweetIntentURL + '?text=' + tweetContent + '&hashtags=' + hashTag);

            window.open(tweet, 'twitter', 'width=550,height=480,scrollbars');

            handleFocusChange($submitButton);
        });
    }

    /**
     * Handles completion of Whimsy interaction steps.
     */
    function whimsy(event) {

        var $this = $(event.target);

        if ($this.data('action') === 'install') {
            event.preventDefault();
            // do stuff
            completeStep($this);
        } else if ($this.data('action') === 'rate') {
            handleVisibilityChange($this);
        }
    }

    /**
     * Handles completion of Firefox Mobile interaction steps.
     */
    function installFirefox(event) {

        var $this = $(event.target);

        if ($this.data('action') === 'install') {
            handleVisibilityChange($this);
        }
    }

    /**
     * Handles completion of Follow Mozilla interaction steps.
     */
    function followMozilla(event) {
        var $this = $(event.target);
        var intentURL = $this.attr('href');

        if ($this.data('action') === 'follow') {
            event.preventDefault();
            window.open(intentURL, 'twitter', 'width=550,height=480,scrollbars');
            handleFocusChange($this);
        }
    }

    // only bind the handler when the form exists
    if ($signupTweetForm.length > 0) {
        initTweetForm();
    }

    $taskSteps.on('click', function(event) {

        var $target = $(event.target);
        var currentTask = $target.data('task');

        if (currentTask === 'whimsy') {
            whimsy(event);
        } else if (currentTask === 'firefox-mobile') {
            installFirefox(event);
        } else if (currentTask === 'follow-mozilla') {
            followMozilla(event);
        }
    });

});
