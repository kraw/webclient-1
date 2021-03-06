(function(scope) {
    "use strict"; /* jshint maxcomplexity:19, maxdepth:6 */

    var DYNLIST_ENABLED = true;

    var logger;

    var viewModeTemplates = {
        'cloud-drive': [
            // List view mode
            '<table>' +
                '<tr>' +
                    '<td width="50">' +
                        '<span class="grid-status-icon"></span>' +
                    '</td>' +
                    '<td>' +
                        '<span class="transfer-filetype-icon"></span>' +
                        '<span class="tranfer-filetype-txt"></span>' +
                    '</td>' +
                    '<td width="100" class="size"></td>' +
                    '<td width="130" class="type"></td>' +
                    '<td width="120" class="time"></td>' +
                    '<td width="62" class="grid-url-field own-data">' +
                        '<a class="grid-url-arrow"></a>' +
                        '<span class="data-item-icon"></span>' +
                    '</td>' +
                '</tr>' +
            '</table>',

            // Icon view mode
            '<a class="data-block-view">' +
                '<span class="data-block-bg ">' +
                    '<span class="file-status-icon indicator"></span>' +
                    '<span class="data-item-icon indicator"></span>' +
                    '<span class="block-view-file-type"><img/></span>' +
                    '<span class="file-settings-icon"></span>' +
                    '<div class="video-thumb-detalis">' +
                        '<i class="small-icon small-play-icon"></i>' +
                        '<span>00:00</span>' +
                    ' </div>' +
                '</span>' +
                '<span class="file-block-title"></span>' +
            '</a>'
        ],

        'shares': [
            // List view mode
            '<table>' +
                '<tr>' +
                    '<td width="50">' +
                        '<span class="grid-status-icon"></span>' +
                    '</td>' +
                    '<td>' +
                        '<div class="shared-folder-icon"></div>' +
                        '<div class="shared-folder-info-block">' +
                            '<div class="shared-folder-name"></div>' +
                            '<div class="shared-folder-info"></div>' +
                        '</div>' +
                    '</td>' +
                    '<td width="240">' +
                        '<div class="fm-chat-user-info todo-star ustatus">' +
                            '<div class="todo-fm-chat-user-star"></div>' +
                            '<div class="fm-chat-user"></div>' +
                            '<div class="nw-contact-status"></div>' +
                            '<div class="fm-chat-user-status"></div>' +
                            '<div class="clear"></div>' +
                        '</div>' +
                    '</td>' +
                    '<td width="270">' +
                        '<div class="shared-folder-access"></div>' +
                    '</td>' +
                    '<td class="grid-url-header-nw">' +
                        '<a class="grid-url-arrow"></a>' +
                    '</td>' +
                '</tr>' +
            '</table>',

            // Icon view mode
            '<a class="data-block-view folder">' +
                '<span class="data-block-bg">' +
                    '<span class="file-status-icon indicator"></span>' +
                    '<span class="shared-folder-access indicator"></span>' +
                    '<span class="block-view-file-type"></span>' +
                    '<span class="file-settings-icon"></span>' +
                    '<div class="video-thumb-detalis">' +
                        '<i class="small-icon small-play-icon"></i>' +
                        '<span>00:00</span>' +
                    ' </div>' +
                '</span>' +
                '<span class="shared-folder-info-block">' +
                    '<span class="shared-folder-name"></span>' +
                    '<span class="shared-folder-info"></span>' +
                '</span>' +
            '</a>'
        ],

        'contacts': [
            // List view mode
            '<table>' +
                '<tr>' +
                    '<td>' +
                        '<div class="fm-chat-user-info todo-star">' +
                            '<div class="fm-chat-user"></div>' +
                            '<div class="contact-email"></div>' +
                        '</div>' +
                    '</td>' +
                    '<td width="240">' +
                        '<div class="ustatus">' +
                            '<div class="nw-contact-status"></div>' +
                            '<div class="fm-chat-user-status"></div>' +
                            '<div class="clear"></div>' +
                        '</div>' +
                    '</td>' +
                    '<td width="270">' +
                        '<div class="contacts-interation"></div>' +
                    '</td>' +
                    '<td class="grid-url-header-nw">' +
                        '<a class="grid-url-arrow"></a>' +
                    '</td>' +
                '</tr>' +
            '</table>',

            // Icon view mode
            '<a class="data-block-view ustatus">' +
                '<span class="file-settings-icon"></span>' +
                '<span class="shared-folder-info-block">' +
                    '<span class="u-card-data">' +
                        '<span class="shared-folder-name"></span>' +
                        '<span class="nw-contact-status"></span>' +
                    '</span>' +
                    '<span class="shared-folder-info"></span>' +
                '</span>' +
            '</a>'
        ],

        'contact-shares': [
            // List view mode
            '<table>' +
                '<tr>' +
                    '<td width="50">' +
                        '<span class="grid-status-icon"></span>' +
                    '</td>' +
                    '<td>' +
                        '<div class="shared-folder-icon"></div>' +
                        '<div class="shared-folder-info-block">' +
                            '<div class="shared-folder-name"></div>' +
                            '<div class="shared-folder-info"></div>' +
                        '</div>' +
                    '</td>' +
                    '<td width="270">' +
                        '<div class="shared-folder-access"></div>' +
                    '</td>' +
                    '<td class="grid-url-header-nw">' +
                        '<a class="grid-url-arrow"></a>' +
                    '</td>' +
                '</tr>' +
            '</table>',

            // Icon view mode
            '<a class="data-block-view folder">' +
                '<span class="data-block-bg">' +
                    '<span class="file-status-icon indicator"></span>' +
                    '<span class="shared-folder-access indicator"></span>' +
                    '<span class="block-view-file-type folder-shared"><img/></span>' +
                    '<span class="file-settings-icon"></span>' +
                    '<div class="video-thumb-detalis">' +
                        '<i class="small-icon small-play-icon"></i>' +
                        '<span>00:00</span>' +
                    ' </div>' +
                '</span>' +
                '<span class="file-block-title"></span>' +
            '</a>'
        ]
    };

    var viewModeContainers = {
        'cloud-drive': [
            '.grid-table.fm',
            '.fm-blocks-view.fm .file-block-scrolling',
        ],
        'contacts': [
            '.grid-table.contacts',
            '.contacts-blocks-scrolling'
        ],
        'shares': [
            '.shared-grid-view .grid-table.shared-with-me',
            '.shared-blocks-scrolling'
        ],
        'contact-shares': [
            '.contacts-details-block .grid-table.shared-with-me',
            '.fm-blocks-view.contact-details-view .file-block-scrolling'
        ]
    };

    mBroadcaster.once('startMega', function() {
        logger = MegaLogger.getLogger('MegaRender');

        var parser = function(template) {
            template = parseHTML(template).firstChild;

            if (template.nodeName === 'TABLE') {
                template = template.querySelector('tr');
            }

            return template;
        };

        // Convert html-templates to DOM nodes ready to use
        for (var section in viewModeTemplates) {
            if (viewModeTemplates.hasOwnProperty(section)) {
                var templates = viewModeTemplates[section];

                viewModeTemplates[section] = templates.map(parser);
            }
        }

        if (d) {
            logger.info('viewModeTemplates', viewModeTemplates);
        }
    });

    // Creates a new frozen object
    var freeze = function(obj) {
        var tmp = Object.create(null);

        Object.keys(obj)
            .forEach(function(name) {
                tmp[name] = obj[name];
            });

        return Object.freeze(tmp);
    };

    // Define object properties
    var define = function(target, property, value) {
        Object.defineProperty(target, property, {
            value : value
        });
    };

    /**
     * MegaRender
     * @param {Number} aViewMode I.e M.viewmode
     * @constructor
     */
    function MegaRender(aViewMode) {
        var renderer;
        var section = 'cloud-drive';

        if (M.currentdirid === 'shares') {

            section = 'shares';
        }
        else if (M.currentrootid === 'contacts'
                && M.currentdirid.length === 11) {

            section = 'contact-shares';
        }
        else if (M.currentdirid === 'contacts') {

            section = 'contacts';
        }

        if (section === 'cloud-drive') {

            if (!DYNLIST_ENABLED) {

                renderer = this.renderer['*'];
            }
        }
        else {
            this.chatIsReady = megaChatIsReady;
        }

        this.numInsertedDOMNodes = 0;


        define(this, 'viewmode',            aViewMode);
        define(this, 'nodeMap',             Object.create(null));
        define(this, 'buildDOMNode',        this.builders[section]);
        define(this, 'finalize',            this.finalizers[section]);
        define(this, 'template',            viewModeTemplates[section][this.viewmode]);
        define(this, 'initialize',          this.initializers[section] || this.initializers['*']);
        define(this, 'render',              renderer || this.renderer[section] || this.renderer['*']);
        define(this, 'getNodeProperties',   this.nodeProperties[section] || this.nodeProperties['*']);
        define(this, 'section',             section);

        if (scope.d) {
            var options = {
                levelColors: {
                    'ERROR': '#DE1F35',
                    'DEBUG': '#837ACC',
                    'WARN':  '#DEBB1F',
                    'INFO':  '#1F85CE',
                    'LOG':   '#9B7BA6'
                }
            };
            define(this, 'logger', new MegaLogger(section, options, logger));
        }

        renderer = undefined;
    }

    MegaRender.prototype = Object.freeze({
        constructor: MegaRender,

        /**
         * Cleanup rendering layout.
         * Called prior to rendering the contents.
         *
         * @param {Boolean} aUpdate       Whether we're updating the list
         * @param {Object}  aNodeList     List of nodes to process, I.e M.v
         * @param {String}  aListSelector DOM query selector for the main list
         * @return {Number} The number of nodes in the current folder.
         */
        cleanupLayout: function(aUpdate, aNodeList, aListSelector) {
            // TODO: This is copied as-is from the former method and should be OOPized as well.

            if (this.logger) {
                console.time('MegaRender.cleanupLayout');
            }

            var lSel = aListSelector;

            hideEmptyGrids();
            $.tresizer();

            if (!aUpdate) {
                sharedFolderUI();

                deleteScrollPanel('.contacts-blocks-scrolling', 'jsp');
                deleteScrollPanel('.contacts-details-block .file-block-scrolling', 'jsp');
                deleteScrollPanel('.file-block-scrolling', 'jsp');

                initOpcGridScrolling();
                initIpcGridScrolling();

                $('.grid-table tr').remove();
                $('.file-block-scrolling a').remove();
                $('.contacts-blocks-scrolling a').remove();

                $(lSel).show().parent().children('table').show();
            }

            // Draw empty grid if no contents.
            var nodeListLength = aNodeList.length;
            if (!nodeListLength) {
                if (M.RubbishID && M.currentdirid === M.RubbishID) {
                    $('.fm-empty-trashbin').removeClass('hidden');
                }
                else if (M.currentdirid === 'contacts') {
                    $('.fm-empty-contacts .fm-empty-cloud-txt').text(l[784]);
                    $('.fm-empty-contacts').removeClass('hidden');
                }
                else if (M.currentdirid === 'opc' || M.currentdirid === 'ipc') {
                    $('.fm-empty-contacts .fm-empty-cloud-txt').text(l[6196]);
                    $('.fm-empty-contacts').removeClass('hidden');
                }
                else if (String(M.currentdirid).substr(0, 7) === 'search/') {
                    $('.fm-empty-search').removeClass('hidden');
                }
                else if (M.currentdirid === 'links') {
                    // TODO: a dedicated splash
                    $('.fm-empty-folder').removeClass('hidden');
                }
                else if (M.currentdirid === M.RootID && folderlink) {
                    // FIXME: implement
                    /*if (!isValidShareLink()) {
                        $('.fm-invalid-folder').removeClass('hidden');
                    }
                    else*/ {
                        $('.fm-empty-folder-link').removeClass('hidden');
                    }
                }
                else if (M.currentdirid === M.RootID) {
                    $('.fm-empty-cloud').removeClass('hidden');
                }
                else if (M.currentdirid === M.InboxID) {
                    $('.fm-empty-messages').removeClass('hidden');
                }
                else if (M.currentdirid === 'shares') {
                    $('.fm-empty-incoming').removeClass('hidden');
                }
                else if (M.currentrootid === M.RootID
                        || M.currentrootid === M.RubbishID
                        || M.currentrootid === M.InboxID) {

                    $('.fm-empty-folder').removeClass('hidden');
                }
                else if (M.currentrootid === 'shares') {
                    M.emptySharefolderUI(lSel);
                }
                else if (M.currentrootid === 'contacts') {
                    $('.fm-empty-incoming.contact-details-view').removeClass('hidden');
                    $('.contact-share-notification').addClass('hidden');
                }
                else if (this.logger) {
                    this.logger.info('Empty folder not handled...', M.currentdirid, M.currentrootid);
                }
            }

            if (this.logger) {
                console.timeEnd('MegaRender.cleanupLayout');
            }

            return nodeListLength;
        },

        /**
         * Render layout.
         * @param {Boolean} aUpdate   Whether we're updating the list
         * @param {Object}  aNodeList Optional list of nodes to process
         * @return {Number} Number of rendered (non-cached) nodes
         */
        renderLayout: function(aUpdate, aNodeList) {
            var initData = null;
            this.numInsertedDOMNodes = 0;

            if (this.logger) {
                console.time('MegaRender.renderLayout');
            }

            if (aNodeList) {
                this.nodeList = aNodeList;
            }

            this.container = document.querySelector(viewModeContainers[this.section][this.viewmode]);

            if (!this.container) {
                siteLoadError(l[1311], this);
                return 0;
            }

            if (this.container.nodeName === 'TABLE') {
                var tbody = this.container.querySelector('tbody');

                if (tbody) {
                    this.container = tbody;
                }
            }

            if (this.initialize) {
                initData = this.initialize(aUpdate, aNodeList);
                if (initData && initData.newNodeList) {
                    aNodeList = initData.newNodeList;
                }
            }

            for (var idx in aNodeList) {
                if (aNodeList.hasOwnProperty(idx)) {
                    var node = this.nodeList[idx];

                    if (node && node.h) {
                        var handle = node.h;
                        var domNode = this.getDOMNode(handle, node);

                        if (domNode) {
                            this.render(node, handle, domNode, idx | 0, aUpdate, initData);
                        }
                    }
                    else if (this.logger) {
                        this.logger.error('Invalid node.', idx, aNodeList[idx]);
                    }
                }
            }

            if (this.finalize) {
                this.finalize(aUpdate, aNodeList, initData);
            }
            this.finalizers['*'].call(this, aUpdate, aNodeList, initData);

            if (this.logger) {
                console.timeEnd('MegaRender.renderLayout');
            }

            if (DYNLIST_ENABLED) {
                return this.numInsertedDOMNodes;
            }
            else {
                return aNodeList.length;
            }

        },

        /**
         * Retrieves a DOM node stored in the `nodeMap`,
         * creating it if it doesn't exists.
         *
         * @param {String} aHandle The ufs-node's handle
         * @param {String} [aNode]   The ufs-node
         */
        getDOMNode: function(aHandle, aNode) {

            if (!this.nodeMap[aHandle]) {
                var template = this.template.cloneNode(true);
                var properties = this.getNodeProperties(aNode, aHandle);

                // Set common attributes used by all builders
                template.setAttribute('id', aHandle);

                if (properties.tooltip) {
                    template.setAttribute('title', properties.tooltip.join("\n"));
                }
                this.addClasses(template, properties.classNames);

                // Construct a new DOM node, and store it for any further use.
                this.nodeMap[aHandle] = this.buildDOMNode(aNode, properties, template);
            }

            return this.nodeMap[aHandle];
        },

        /**
         * Checks if a DOM node for that `aHandle` is created and cached in MegaRender.
         *
         * @param aHandle
         */
        hasDOMNode: function(aHandle) {
            return this.nodeMap[aHandle] ? true : false;
        },

        /**

        /**
         * Add classes to DOM node
         * @param {Object} aDOMNode    DOM node to set class over
         * @param {Array}  aClassNames An array of classes
         */
        addClasses: function(aDOMNode, aClassNames) {
            var len;

            // TODO: find what is causing the issue and remove then all this
            if (d) {
                len = aClassNames.length;

                while (len--) {
                    if (!aClassNames[len] || typeof aClassNames[len] !== 'string') {
                        console.warn('Invalid classList', len, aClassNames[len], aClassNames[len - 1], aClassNames);
                        break;
                    }
                }
            }
            aClassNames = aClassNames.filter(String);

            len = aClassNames.length;
            while (len--) {
                // XXX: classList.add does support an array, but not in all browsers
                aDOMNode.classList.add(aClassNames[len]);
            }
        },

        /**
         * Remove classes from DOM node
         * @param {Object} aDOMNode    DOM node to set class over
         * @param {Array}  aClassNames An array of classes
         */
        removeClasses: function(aDOMNode, aClassNames) {
            // XXX: classList.add does support an array, but not in all browsers
            var len = aClassNames.length;
            while (len--) {
                aDOMNode.classList.remove(aClassNames[len]);
            }
        },

        /**
         * Insert DOM Node.
         * @param {Object}  aNode      The ufs-node
         * @param {Number}  aNodeIndex The ufs-node's index at M.v
         * @param {Object}  aDOMNode   The DOM node to insert
         * @param {Boolean} aUpdate    Whether we're updating the list
         * @param {Object}  aDynCache  Dynamic list cache entry, optional
         */
        insertDOMNode: function(aNode, aNodeIndex, aDOMNode, aUpdate, aDynCache) {
            if (!aUpdate || !this.container.querySelector(aDOMNode.nodeName)) {
                // 1. if the current view does not have any nodes, just append it
                aNode.seen = true;
                this.numInsertedDOMNodes++;
                this.container.appendChild(aDOMNode);
            }
            else {
                var domNode;
                var prevNode;
                var nextNode;

                if (document.getElementById(aNode.h)) {
                    aNode.seen = true;
                    return;
                }

                if (aUpdate && (prevNode = this.nodeList[aNodeIndex - 1])
                        && (domNode = document.getElementById(prevNode.h))) {

                    // 2. if there is a node before the new node in the current view, add it after that node:
                    // this.logger.debug('// 2. ---', aNode.name, aNode);

                    domNode.parentNode.insertBefore(aDOMNode, domNode.nextElementSibling);
                }
                else if (aUpdate && (nextNode = this.nodeList[aNodeIndex + 1])
                        && (domNode = document.getElementById(nextNode.h))) {

                    // 3. if there is a node after the new node in the current view, add it before that node:
                    // this.logger.debug('// 3. ---', aNode.name, aNode);

                    domNode.parentNode.insertBefore(aDOMNode, domNode);
                }
                else if (aNode.t && (domNode = this.container.querySelector(aDOMNode.nodeName))) {
                    // 4. new folder: insert new node before the first folder in the current view
                    // this.logger.debug('// 4. ---', aNode.name, aNode);

                    domNode.parentNode.insertBefore(aDOMNode, domNode);
                }
                else {
                    // 5. new file: insert new node before the first file in the current view
                    // this.logger.debug('// 5. ---', aNode.name, aNode);

                    var file = this.container.querySelector(aDOMNode.nodeName + ':not(.folder)');
                    if (file) {
                        file.parentNode.insertBefore(aDOMNode, file);
                    }
                    else {
                        // 6. if this view does not have any files, insert after the last folder
                        // this.logger.debug('// 6. ---', aNode.name, aNode);

                        this.container.appendChild(aDOMNode);
                    }
                }
                aNode.seen = true;
                this.numInsertedDOMNodes++;
            }
        },

        /** Node properties collector */
        nodeProperties: freeze({
            /**
             * @param {Object}  aNode         The ufs-node
             * @param {String}  aHandle       The ufs-node's handle
             * @param {Boolean} aExtendedInfo Include info needed by builders
             */
            '*': function(aNode, aHandle, aExtendedInfo) {
                var props = {classNames: []};
                var share = M.getNodeShare(aNode);

                if (aNode.su) {
                    props.classNames.push('inbound-share');
                }

                if (aNode.t) {
                    props.type = l[1049];
                    props.icon = 'folder';
                    props.classNames.push('folder');
                }
                else {
                    props.classNames.push('file');
                    props.type = filetype(aNode.name);
                    props.size = bytesToSize(aNode.s);
                }
                props.name = aNode.name;

                if (missingkeys[aHandle] || share.down) {
                    props.icon = 'generic';
                    props.type = l[7381];// i.e. 'unknown'

                    props.tooltip = [];

                    // Taken down item
                    if (share.down) {
                        props.takenDown = true;
                        props.classNames.push('taken-down');
                        props.tooltip.push(aNode.t ? l[7705] : l[7704]);
                    }

                    // Undecryptable node
                    if (missingkeys[aHandle]) {
                        props.undecryptable = true;
                        props.classNames.push('undecryptable');

                        if (aNode.t) {
                            props.name = l[8686];// i.e. 'undecrypted folder'
                            props.tooltip.push(l[8595]);
                        }
                        else {
                            props.name = l[8687];// i.e. 'undecrypted file'
                            props.tooltip.push(l[8602]);
                        }
                    }
                }

                if (aExtendedInfo !== false) {

                    if (share) {
                        props.linked = true;
                        props.classNames.push('linked');
                    }

                    props.icon = fileIcon(aNode);

                    if (!this.viewmode) {
                        if (M.lastColumn && aNode.p !== "contacts") {
                            props.time = time2date(aNode[M.lastColumn] || aNode.ts);
                        }
                        else {
                            props.time = time2date(aNode.ts
                                || (aNode.p === 'contacts' && M.contactstatus(aHandle).ts));
                        }
                    }

                    // Colour label
                    if (aNode.lbl) {
                        var colourLabel = M.getColourClassFromId(aNode.lbl);
                        props.classNames.push('colour-label');
                        props.classNames.push(colourLabel);
                    }
                }

                return props;
            },
            'shares': function(aNode, aHandle, aExtendedInfo) {
                var avatar;
                var props = this.nodeProperties['*'].call(this, aNode, aHandle, false);

                props.userHandle = aNode.su || aNode.p;
                props.userName = M.getNameByHandle(props.userHandle);

                if (aNode.r === 1) {
                    props.accessRightsText = l[56];
                    props.accessRightsClass = 'read-and-write';
                }
                else if (aNode.r === 2) {
                    props.accessRightsText = l[57];
                    props.accessRightsClass = 'full-access';
                }
                else {
                    props.accessRightsText = l[55];
                    props.accessRightsClass = 'read-only';
                }

                if (this.viewmode) {
                    if (aExtendedInfo !== false) {
                        avatar = useravatar.contact(props.userHandle, 'nw-contact-avatar', 'span');
                    }
                }
                else {
                    var cs = M.contactstatus(aHandle);

                    if (cs.files === 0 && cs.folders === 0) {
                        props.shareInfo = l[782];// Empty Folder
                    }
                    else {
                        props.shareInfo = fm_contains(cs.files, cs.folders);
                    }

                    if (this.chatIsReady) {
                        var contact = M.u[props.userHandle];
                        if (contact) {
                            props.onlineStatus = M.onlineStatusClass(
                                contact.presence ? contact.presence : "unavailable"
                            );
                        }
                    }

                    if (aExtendedInfo !== false) {
                        avatar = useravatar.contact(props.userHandle, 'nw-contact-avatar');
                    }
                }

                if (avatar) {
                    props.avatar = parseHTML(avatar).firstChild;
                }

                // Colour label
                if (aNode.lbl && (aNode.su !== u_handle)) {
                    var colourLabel = M.getColourClassFromId(aNode.lbl);
                    props.classNames.push('colour-label');
                    props.classNames.push(colourLabel);
                }

                return props;
            },
            'contact-shares': function(aNode, aHandle, aExtendedInfo) {
                return this.nodeProperties.shares.call(this, aNode, aHandle, false);
            },
            'contacts': function(aNode, aHandle, aExtendedInfo) {
                var props = {classNames: []};

                if (this.logger) {
                    // We only care about active contacts
                    assert(Object(M.u[aHandle]).c === 1, 'Found non-active contact');
                }

                var avatar = useravatar.contact(aHandle, 'nw-contact-avatar');

                if (avatar) {
                    props.avatar = parseHTML(avatar).firstChild;
                }

                if (this.chatIsReady) {
                    props.onlineStatus = M.onlineStatusClass(aNode.presence ? aNode.presence : false);

                    if (props.onlineStatus) {
                        props.classNames.push(props.onlineStatus[1]);
                    }

                }

                props.classNames.push(aHandle);
                props.userName = M.getNameByHandle(aNode.u);

                return props;
            }
        }),

        /** DOM Node Builders */
        builders: freeze({
            /**
             * @param {Object} aNode       The ufs-node
             * @param {Object} aProperties The ufs-node properties
             * @param {Object} aTemplate   The DOM Node template
             */
            'cloud-drive': function(aNode, aProperties, aTemplate) {
                var tmp;

                if (aNode.fav) {
                    var selector = this.viewmode ? '.file-status-icon' : '.grid-status-icon';
                    aTemplate.querySelector(selector).classList.add('star');
                }

                if (this.viewmode) {
                    tmp = aTemplate.querySelector('.block-view-file-type');

                    if (aProperties.icon) {
                        tmp.classList.add(aProperties.icon);
                    }

                    aTemplate.querySelector('.file-block-title').textContent = aProperties.name;
                }
                else {
                    if (aProperties.linked) {
                        aTemplate.querySelector('.grid-url-field').classList.add('linked');
                    }

                    if (aProperties.size !== undefined) {
                        aTemplate.querySelector('.size').textContent = aProperties.size;
                    }
                    aTemplate.querySelector('.type').textContent = aProperties.type;
                    aTemplate.querySelector('.time').textContent = aProperties.time;
                    aTemplate.querySelector('.tranfer-filetype-txt').textContent = aProperties.name;

                    tmp = aTemplate.querySelector('.transfer-filetype-icon');
                    tmp.classList.add(aProperties.icon);
                }
                this.addClasses(tmp, aProperties.classNames);

                return aTemplate;
            },
            'shares': function(aNode, aProperties, aTemplate) {

                if (aNode.fav) {
                    var selector = this.viewmode ? '.file-status-icon' : '.grid-status-icon';
                    aTemplate.querySelector(selector).classList.add('star');
                }

                aTemplate.querySelector('.shared-folder-name').textContent = aProperties.name;

                var tmp = aTemplate.querySelector('.shared-folder-access');
                tmp.classList.add(aProperties.accessRightsClass);

                if (aProperties.avatar) {
                    var avatar = this.viewmode ? '.shared-folder-info-block' : '.fm-chat-user-info';
                    avatar = aTemplate.querySelector(avatar);

                    avatar.parentNode.insertBefore(aProperties.avatar, avatar);
                }

                if (this.viewmode) {

                    if (aProperties.icon) {
                        aTemplate.querySelector('.block-view-file-type').classList.add(aProperties.icon);
                    }

                    aTemplate.querySelector('.shared-folder-info').textContent = 'by ' + aProperties.userName;
                }
                else {
                    tmp.textContent = aProperties.accessRightsText;

                    tmp = aTemplate.querySelector('.fm-chat-user-info');
                    tmp.classList.add(aProperties.userHandle);
                    if (aProperties.onlineStatus) {
                        tmp.classList.add(aProperties.onlineStatus[1]);
                    }

                    tmp = aTemplate.querySelector('.fm-chat-user-status');
                    tmp.classList.add(aProperties.userHandle);
                    if (aProperties.onlineStatus) {
                        tmp.textContent = aProperties.onlineStatus[0];
                    }

                    aTemplate.querySelector('.fm-chat-user').textContent = aProperties.userName;
                    aTemplate.querySelector('.shared-folder-info').textContent = aProperties.shareInfo;
                }

                return aTemplate;
            },
            'contact-shares': function(aNode, aProperties, aTemplate) {

                var tmp = aTemplate.querySelector('.shared-folder-access');
                tmp.classList.add(aProperties.accessRightsClass);

                if (this.viewmode) {
                    aTemplate.querySelector('.file-block-title').textContent = aProperties.name;
                }
                else {
                    tmp.textContent = aProperties.accessRightsText;

                    aTemplate.querySelector('.shared-folder-name').textContent = aProperties.name;
                    aTemplate.querySelector('.shared-folder-info').textContent = aProperties.shareInfo;
                }

                return aTemplate;
            },
            'contacts': function(aNode, aProperties, aTemplate) {

                if (aProperties.avatar) {
                    var avatar = this.viewmode ? '.shared-folder-info-block' : '.fm-chat-user-info';
                    avatar = aTemplate.querySelector(avatar);

                    avatar.parentNode.insertBefore(aProperties.avatar, avatar);
                }

                if (this.viewmode) {

                    aTemplate.querySelector('.shared-folder-name').textContent = aNode.name;
                    aTemplate.querySelector('.shared-folder-info').textContent = aNode.m;
                }
                else {
                    var tmp = aTemplate.querySelector('.fm-chat-user-status');

                    tmp.classList.add(aNode.h);
                    if (aProperties.onlineStatus) {
                        tmp.textContent = aProperties.onlineStatus[0];
                    }

                    this.addClasses(aTemplate.querySelector('.ustatus'), aProperties.classNames);

                    aTemplate.querySelector('.contact-email').textContent = aNode.m;
                    aTemplate.querySelector('.fm-chat-user').textContent = aProperties.userName;
                    aTemplate.querySelector('.contacts-interation').classList.add('li_' + aNode.h);
                }

                return aTemplate;
            }
        }),

        /** DOM Node Renderers */
        renderer: freeze({
            /**
             * @param {Object}  aNode      The ufs-node
             * @param {String}  aHandle    The ufs-node's handle
             * @param {Object}  aDOMNode   The DOM Node
             * @param {Number}  aNodeIndex The ufs-node's index in M.v
             * @param {Boolean} aUpdate    Whether we're updating the list
             * @param {Object}  aUserData  Any data provided by initializers
             */
            '*': function(aNode, aHandle, aDOMNode, aNodeIndex, aUpdate, aUserData) {
                if (!DYNLIST_ENABLED || !this.megaList) {
                    this.insertDOMNode(aNode, aNodeIndex, aDOMNode, aUpdate);
                }
            },
            'contacts': function(aNode, aHandle, aDOMNode, aNodeIndex, aUpdate, aUserData) {
                this.renderer['*'].apply(this, arguments);
                getLastInteractionWith(aHandle);
            },
            'cloud-drive': function(aNode, aHandle, aDOMNode, aNodeIndex, aUpdate, aUserData) {
                if (!DYNLIST_ENABLED || !this.megaList) {
                    this.insertDOMNode(aNode, aNodeIndex, aDOMNode, aUpdate, cacheEntry);
                }
            }
        }),

        /** Renderer initializers */
        initializers: freeze({
            /**
             * @param {Boolean} aUpdate   Whether we're updating the list
             * @param {Array}   aNodeList The list of ufs-nodes to process
             * @return {Array} a filtered list of nodes, if needed
             */
            '*': function(aUpdate, aNodeList) {
                if (!aUpdate && this.section !== 'contacts') {
                    M.setLastColumn(localStorage._lastColumn);
                }

                return null;
            },
            'cloud-drive': function(aUpdate, aNodeList) {
                var self = this;
                var result = this.initializers['*'].apply(this, arguments);

                if (DYNLIST_ENABLED) {
                    if (!aUpdate || !this.megaList) {
                        var isFF = ua.details.engine === "Gecko";

                        var megaListOptions = {
                            'itemRenderFunction': M.megaListRenderNode,
                            'preserveOrderInDOM': true,
                            'extraRows': isFF ? 10 : 4,
                            'batchPages': isFF ? 1 : 0,
                            'appendOnly': isFF,
                            'onContentUpdated': function () {
                                M.rmSetupUIDelayed();
                            },
                            'perfectScrollOptions': {
                                'handlers': ['click-rail', 'drag-scrollbar', 'wheel', 'touch'],
                                'minScrollbarLength': 20
                            },
                        };
                        var megaListContainer;

                        if (this.viewmode) {
                            megaListOptions['itemWidth'] = 156 + 2 + 2 + 12 /* 12 = margin-left */;
                            megaListOptions['itemHeight'] = 184 + 2 + 2 + 12 /* 12 = margin-top */;
                            megaListContainer = this.container;
                        }
                        else {
                            megaListOptions['itemWidth'] = false;
                            megaListOptions['itemHeight'] = 24;
                            megaListOptions['appendTo'] = 'tbody';
                            megaListOptions['renderAdapter'] = new MegaList.RENDER_ADAPTERS.Table();
                            megaListContainer = this.container.parentNode.parentNode;
                        }

                        define(this, 'megaList', new MegaList(megaListContainer, megaListOptions));
                    }
                    else if(aNodeList.length && Object(newnodes).length) {
                        if (!result) {
                            result = {};
                        }

                        var newNodes = [];
                        var nodeIndex = [];

                        var objMap = newnodes
                            .map(function(n) {
                                return n.h;
                            })
                            .reduce(function(obj, value) {
                                obj[value] = 1;
                                return obj;
                            }, {});

                        for (var idx in aNodeList) {
                            if (aNodeList.hasOwnProperty(idx)) {
                                if (objMap[aNodeList[idx].h]) {
                                    newNodes[idx] = aNodeList[idx];
                                }
                                nodeIndex[aNodeList[idx].h] = idx;
                            }
                        }

                        if (newNodes.length) {
                            result.newNodeList = newNodes;
                        }
                    }
                }

                return result;
            }
        }),

        /** Renderer finalizers */
        finalizers: freeze({
            /**
             * A generic finalizer that would be called after the 'section' one finishes.
             *
             * @param {Boolean} aUpdate   Whether we're updating the list
             * @param {Array}   aNodeList The list of ufs-nodes processed
             * @param {Object}  aUserData  Any data provided by initializers
             */
            '*': function(aUpdate, aNodeList, aUserData) {
                if (!window.fmShortcuts) {
                    window.fmShortcuts = new FMShortcuts();
                }


                if (!aUpdate) {
                    /**
                     * (Re)Init the selectionManager, because the .selectable() is reinitialized and we need to
                     * reattach to its events.
                     *
                     * @type {SelectionManager}
                     */
                    window.selectionManager = new SelectionManager(
                        $(this.container),
                        $.selected && $.selected.length > 0
                    );

                    // restore selection if needed
                    if ($.selected) {
                        $.selected.forEach(function(h) {
                            selectionManager.add_to_selection(h);
                        });
                    }
                }
            },
            /**
             * @param {Boolean} aUpdate   Whether we're updating the list
             * @param {Array}   aNodeList The list of ufs-nodes processed
             * @param {Object}  aUserData  Any data provided by initializers
             */
            'contact-shares': function(aUpdate, aNodeList, aUserData) {
                var contact = M.d[M.currentdirid];

                if (contact) {
                    $('.contact-share-notification')
                        .text(contact.name + ' shared the following folders with you:')
                        .removeClass('hidden');
                }
            },
            'cloud-drive': function(aUpdate, aNodeList, aUserData) {
                if (DYNLIST_ENABLED) {
                    if (!aUpdate) {
                        var container = document.querySelector(viewModeContainers[this.section][this.viewmode]);
                        this.addClasses(
                            document.querySelector(viewModeContainers[this.section][0 + !this.viewmode]),
                            ["hidden"]
                        );

                        this.addClasses(container, ['megaListContainer']);

                        // because, viewModeContainers is not perfectly structured as before (e.g.
                        // container != the actual container that holds the list, we try to guess/find the node, which
                        // requires showing
                        if (container.classList.contains("hidden")) {
                            this.removeClasses(container, ["hidden"]);
                        }
                        if (container.parentNode.classList.contains("hidden")) {
                            this.removeClasses(container.parentNode, ["hidden"]);
                        }
                        if (container.parentNode.parentNode.classList.contains("hidden")) {
                            this.removeClasses(container.parentNode.parentNode, ["hidden"]);
                        }
                        if (container.parentNode.parentNode.parentNode.classList.contains("hidden")) {
                            this.removeClasses(container.parentNode.parentNode, ["hidden"]);
                        }


                        var ids = [];
                        aNodeList.forEach(function(v) {
                            ids.push(v.h);
                        });

                        this.megaList.batchAdd(ids);
                        this.megaList.initialRender();
                    }
                    else if (aUserData && aUserData.newNodeList && aUserData.newNodeList.length > 0) {
                        var sortedNodeList = {};
                        var foundNodesForAdding = false;
                        aNodeList.forEach(function(v, k) {
                            // newnodes, and update may be triggered by an move op (because of the newly modified
                            // lack of 'i' property), so the newnodes may contain unrelated nodes (to the current
                            // view)
                            if (v.p === M.currentdirid) {
                                foundNodesForAdding = true;
                                sortedNodeList[k] = v.h;
                                if (!M.v[k] || M.v[k].h !== v.h) {
                                    console.error("This should never happen, e.g. !M.v[k] || M.v[k].h !== v.h", v);
                                }
                            }

                        });

                        if (foundNodesForAdding) {
                            this.megaList.batchAddFromMap(sortedNodeList);
                        }
                    }
                }
            }
        }),

        destroy: function() {
            // megaList can be undefined/empty if the current folder had no nodes in it.
            if (DYNLIST_ENABLED && this.megaList) {
                this.megaList.destroy();
                window.selectionManager = false;
            }
        },

        toString: function() {
            return '[MegaRender:' + this.section + ':' + this.viewmode + ']';
        }
    });

    define(scope, 'MegaRender', Object.freeze(MegaRender));
})(this);
