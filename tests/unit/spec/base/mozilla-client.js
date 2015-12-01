/* For reference read the Jasmine and Sinon docs
 * Jasmine docs: https://jasmine.github.io/2.0/introduction.html
 * Sinon docs: http://sinonjs.org/docs/
 */

/* global describe, beforeEach, afterEach, it, expect, sinon, spyOn, jasmine */

describe('mozilla-client.js', function() {

    'use strict';

    describe('_isFirefox', function() {

        it('should consider Firefox for desktop to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')).toBeTruthy();
        });

        it('should consider Firefox for Android to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
        });

        it('should consider Firefox for iOS to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4')).toBeTruthy();
        });

        it('should not consider Camino to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en; rv:1.9.2.24) Gecko/20111114 Camino/2.1 (like Firefox/3.6.24)')).toBeFalsy();
        });

        it('should not consider Chrome to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36')).toBeFalsy();
        });

        it('should not consider Safari to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2')).toBeFalsy();
        });

        it('should not consider IE to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)')).toBeFalsy();
        });

        it('should not consider SeaMonkey to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:25.0) Gecko/20100101 Firefox/25.0 SeaMonkey/2.22.1')).toBeFalsy();
        });

        it('should not consider Iceweasel to be Firefox', function() {
            expect(window.Mozilla.Client._isFirefox('Mozilla/5.0 (X11; Linux x86_64; rv:17.0) Gecko/20121202 Firefox/17.0 Iceweasel/17.0.1')).toBeFalsy();
        });

    });

    describe('_isFirefoxDesktop', function () {

        it('should return true for Firefox on Desktop', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (X11; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeTruthy();
        });

        it('should return false for Firefox on Android', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Android; Tablet; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
        });

        it('should return false for Firefox on iPhone', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4')).toBeFalsy();
        });

        it('should return false for Firefox OS', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Tablet; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
        });

        it('should return false for other Gecko-based browsers', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en; rv:1.9.2.24) Gecko/20111114 Camino/2.1 (like Firefox/3.6.24)')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:25.0) Gecko/20100101 Firefox/25.0 SeaMonkey/2.22.1')).toBeFalsy();
        });

        it('should return false for other browsers', function() {
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxDesktop('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36')).toBeFalsy();
        });

    });

    describe('_isFirefoxAndroid', function () {

        it('should return false for Firefox on Desktop', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (X11; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeFalsy();
        });

        it('should return false for Firefox on iPhone', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4')).toBeFalsy();
        });

        it('should return true for Firefox Android on Phone', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeTruthy();
        });

        it('should return true for Firefox Android on Tablet', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Android; Tablet; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeTruthy();
        });

        it('should return true for Firefox OS on Phone', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeTruthy();
        });

        it('should return true for Firefox OS on Tablet', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Tablet; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeTruthy();
        });

        it('should return true for Firefox for Maemo (Nokia N900)', function() {
            expect(window.Mozilla.Client._isFirefoxAndroid('Mozilla/5.0 (Maemo; Linux armv7l; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 Fennec/10.0.1')).toBeTruthy();
        });

    });

    describe('_isFirefoxiOS', function () {

        it('should return false for Firefox on Desktop', function() {
            expect(window.Mozilla.Client._isFirefoxiOS('Mozilla/5.0 (Windows NT x.y; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxiOS('Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxiOS('Mozilla/5.0 (X11; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0')).toBeFalsy();
        });

        it('should return false for Firefox Android', function() {
            expect(window.Mozilla.Client._isFirefoxiOS('Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
        });

        it('should return true for Firefox on iPhone', function() {
            expect(window.Mozilla.Client._isFirefoxiOS('Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4')).toBeTruthy();
        });

        it('should return true for Firefox on iPad', function() {
            expect(window.Mozilla.Client._isFirefoxiOS('Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4')).toBeTruthy();
        });

    });

    describe('_isLikeFirefox', function() {

        it('should consider SeaMonkey to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0 SeaMonkey/2.37a1')).toBeTruthy();
        });

        it('should consider IceWeasel to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (X11; Linux x86_64; rv:17.0) Gecko/20121202 Firefox/17.0 Iceweasel/17.0.1')).toBeTruthy();
        });

        it('should consider IceCat to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (X11; Linux x86_64; rv:17.0) Gecko/20121201 icecat/17.0.1')).toBeTruthy();
        });

        it('should consider Camino to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en; rv:1.9.2.24) Gecko/20111114 Camino/2.1 (like Firefox/3.6.24)')).toBeTruthy();
        });

        it('should consider Camino like userAgent to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en; rv:1.9.2.24) Gecko/20111114 (like Firefox/3.6.24)')).toBeTruthy();
        });

        it('should not consider Firefox to be "like" Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')).toBeFalsy();
        });

        it('should not consider Chrome to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36')).toBeFalsy();
        });

        it('should not consider Safari to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2')).toBeFalsy();
        });

        it('should not consider IE to be like Firefox', function() {
            expect(window.Mozilla.Client._isLikeFirefox('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)')).toBeFalsy();
        });

    });

    describe('_getFirefoxVersion', function () {

        it('should return the firefox version number as a string', function () {
            expect(window.Mozilla.Client._getFirefoxVersion('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')).toEqual('23.0');
        });

        it('should return 0 for Firefox for iOS', function() {
            expect(window.Mozilla.Client._getFirefoxVersion('Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4')).toEqual('0');
        });

        it('should return 0 for non Firefox browsers', function () {
            expect(window.Mozilla.Client._getFirefoxVersion('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36')).toEqual('0');
        });

    });

    describe('_getFirefoxMajorVersion', function () {

        it('should return the firefox master version number', function () {
            // Pretend to be Firefox 23
            expect(window.Mozilla.Client._getFirefoxMajorVersion('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:23.0) Gecko/20100101 Firefox/23.0')).toEqual(23);
        });

        it('should return 0 for Firefox for iOS', function() {
            expect(window.Mozilla.Client._getFirefoxMajorVersion('Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.1 Mobile/12F69 Safari/600.1.4')).toEqual(0);
        });

        it('should return 0 for non Firefox browsers', function () {
            expect(window.Mozilla.Client._getFirefoxMajorVersion('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36')).toEqual(0);
        });

    });

    describe('_isFirefoxUpToDate', function () {

        var h = document.documentElement;

        beforeEach(function () {
            h.setAttribute('data-latest-firefox', '46.0.2');
            h.setAttribute('data-esr-versions', '38.8.0 45.1.0');
        });

        afterEach(function () {
            h.removeAttribute('data-latest-firefox');
            h.removeAttribute('data-esr-versions');
        });

        it('should consider up to date if user version is equal to latest version', function() {
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '46.0.2')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, true, '38.8.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, true, '45.1.0')).toBeTruthy();
        });

        it('should consider up to date if user version is greater than latest version', function() {
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '46.0.3')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '47.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, true, '38.9.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, true, '45.2.0')).toBeTruthy();
        });

        it('should consider up to date if user version is slightly less than latest version but strict option is false', function() {
            expect(window.Mozilla.Client._isFirefoxUpToDate(false, false, '46.0.1')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(false, false, '46.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(false, true, '38.7.0')).toBeTruthy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(false, true, '45.0')).toBeTruthy();
        });

        it('should consider outdated if user version is slightly less than latest version and strict option is true', function() {
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '46.0.1')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '45.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '38.7.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '45.0')).toBeFalsy();
        });

        it('should consider outdated if user version is much less than latest version, regardless of strict option', function() {
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, false, '40.0.2')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(false, false, '40.0.2')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(true, true, '31.7.0')).toBeFalsy();
            expect(window.Mozilla.Client._isFirefoxUpToDate(false, true, '31.7.0')).toBeFalsy();
        });

    });

    describe('getFirefoxDetails', function () {

        var h = document.documentElement;

        beforeEach(function () {
            h.setAttribute('data-latest-firefox', '46.0.2');
            h.setAttribute('data-esr-versions', '38.8.0 45.1.0');
            jasmine.clock().install();
        });

        afterEach(function () {
            h.removeAttribute('data-latest-firefox');
            h.removeAttribute('data-esr-versions');
            delete window.Mozilla.Client.FirefoxDetails;
            jasmine.clock().uninstall();
        });

        it('should fire the callback function with a Firefox details object', function() {
            var callback1 = jasmine.createSpy('callback1');
            var callback2 = jasmine.createSpy('callback2');
            var result = {
                'accurate': false, // Because the mozUITour API doesn't get called in tests, this won't be true
                'version': '46.0.2',
                'channel': 'release',
                'isUpToDate': true,
                'isESR': false
            };

            spyOn(window.Mozilla.Client, '_isFirefoxUpToDate').and.returnValue(true);
            spyOn(window.Mozilla.Client, '_getFirefoxVersion').and.returnValue('46.0.2');
            window.Mozilla.Client.getFirefoxDetails(callback1);
            jasmine.clock().tick(500);
            expect(callback1).toHaveBeenCalledWith(result);
            expect(window.Mozilla.Client.FirefoxDetails).toEqual(result);
            window.Mozilla.Client.getFirefoxDetails(callback2);
            jasmine.clock().tick(500);
            expect(callback2).toHaveBeenCalledWith(result);
            expect(window.Mozilla.Client._isFirefoxUpToDate.calls.count()).toEqual(1);
        });

    });

});
