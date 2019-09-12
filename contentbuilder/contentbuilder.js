/*
ContentBuilder.js ver.3.6
*/

(function ($) {
    var plugin;

    var scriptPath = currentScriptPath();
    var dragActive = false;
    var activeDraggableBox;
    var bIsAppleMobile;
    var $wrapper;
    var customgradcolors = [];
    var bLangFile = false;
    var bSideSnippets = false;
    var bSnippetDropped = false;
    var cellFormat = '';
    var rowFormat = '';
    var initialRteWidth;
    var filesAdded = "";

    $.contentbuilder = function (options) {

        var defaults = {
            container: '.is-container',
            page: '.is-wrapper',
            framework: '',
            row: '',
            cols: [],
            colequal: [],
            colsizes: [],
            classReplace: [],
            /*classReplace: [
                ['row clearfix',''],
                ['column full',''],
                ['column half',''],
                ['column third',''],
                ['column fourth',''],
                ['column fifth',''],
                ['column sixth',''],
                ['column two-third',''],
                ['column two-fourth',''],
                ['column two-sixth','']
            ],*/
            cellFormat: '',
            rowFormat: '',
            snippetData: 'assets/minimalist-blocks/snippetlist.html',
            modulePath: 'assets/modules/',
            moduleConfig: [],
            imageEmbed: true,
            elementEditor: true,
            onChange: function () { },
            onRender: function () { }, //triggered when new snippet added (or content changed). If there are custom extensions/plugins within the content, re-init the plugins here.
            onAdd: function () { },
            onContentClick: function () { },
            onImageBrowseClick: function () { },
            onImageSettingClick: function () { },
            onImageSelectClick: function () { },
            onFileSelectClick: function () { },
            imageselect: '',
            fileselect: '',
            iconselect: 'assets/ionicons/icons.html',
            colors: ["#ff8f00", "#ef6c00", "#d84315", "#c62828", "#58362f", "#37474f", "#353535",
                "#f9a825", "#9e9d24", "#558b2f", "#ad1457", "#6a1b9a", "#4527a0", "#616161",
                "#00b8c9", "#009666", "#2e7d32", "#0277bd", "#1565c0", "#283593", "#9e9e9e"],
            gradientcolors: [
                ["linear-gradient(0deg, rgb(255, 57, 25), rgb(249, 168, 37))"],
                ["linear-gradient(0deg, rgb(255, 57, 25), rgb(255, 104, 15))"],
                ["linear-gradient(0deg, #FF5722, #FF9800)"],
                ["linear-gradient(0deg, #613ca2, rgb(110, 123, 217))"],
                ["linear-gradient(0deg, rgb(65, 70, 206), rgb(236, 78, 130))"],
                ["linear-gradient(0deg, rgb(0, 150, 102), rgb(90, 103, 197))"],
                ["linear-gradient(30deg, rgb(249, 119, 148), rgb(98, 58, 162))"],
                ["linear-gradient(0deg, rgb(223, 70, 137), rgb(90, 103, 197))"],
                ["linear-gradient(0deg, rgb(40, 53, 147), rgb(90, 103, 197))"],
                ["linear-gradient(0deg, rgb(21, 101, 192), rgb(52, 169, 239))"],
                ["linear-gradient(0deg, rgb(32, 149, 219), rgb(139, 109, 230))"],
                ["linear-gradient(0deg, rgb(90, 103, 197), rgb(0, 184, 201))"],
                ["linear-gradient(0deg, rgb(0, 184, 201), rgb(253, 187, 45))"],
                ["linear-gradient(0deg, rgb(255, 208, 100), rgb(239, 98, 159))"],
                ["linear-gradient(0deg, rgb(0, 214, 223), rgb(130, 162, 253))"],
                ["linear-gradient(0deg, rgb(50, 234, 251), rgb(248, 247, 126))"],
                ["linear-gradient(0deg, rgb(141, 221, 255), rgb(255, 227, 255))"],
                ["linear-gradient(0deg, rgb(255, 170, 170), rgb(255, 255, 200))"],
                ["linear-gradient(0deg, rgb(239, 239, 239), rgb(252, 252, 252))"]
                ],
            customval: '',
            largerImageHandler: '',
            snippetPathReplace: ['',''],
            buttons: ["bold", "italic", "createLink", "align", "color", "formatPara", "font", "formatting", "list", "textsettings", "image", "tags", "removeFormat"],
            buttonsMore: ["icon", "gridTool", "html", "preferences"],
            absolutePath: false,
            customTags: [],
            animateModal: true,
            emailMode: false,
            imageQuality: 0.92,
            elementAnimate: false,
            snippetList: '#divSnippetList',
            sidePanel: 'right',
            snippetHandle: true,
            snippetOpen: false,
            snippetPageSliding: true,
            scriptPath: '', //if set, will replace the currentScriptPath()
            builderMode: '',
            columnTool: true,
            elementTool: true,
            rowcolOutline: true,
            sourceEditor: true,
            columnHtmlEditor: true,
            rowHtmlEditor: false,
            rowMoveButtons: true,
            htmlSyntaxHighlighting: false,
            scrollableEditingToolbar: true,
            toolbar: 'top',
            toolbarDisplay: 'auto',
            toolbarAddSnippetButton: false,
            /*toolbarViewHtmlButton: true,
            toolbarPreferencesButton: true,*/
            paste: 'text',
            plugins: [],
            elementSelection: true,
            animatedSorting: false,
            dragWithoutHandle: false,
            addButtonPlacement: '',
            snippetCategories: [
                [120,"Basic"],
                [118,"Article"],
                [101,"Headline"],
                [119,"Buttons"],
                [102,"Photos"],
                [103,"Profile"],
                [116,"Contact"],
                [104,"Products"],
                [105,"Features"],
                [106,"Process"],
                [107,"Pricing"],
                [108,"Skills"],
                [109,"Achievements"],
                [110,"Quotes"],
                [111,"Partners"],
                [112,"As Featured On"],
                [113,"Page Not Found"],
                [114,"Coming Soon"],
                [115,"Help, FAQ"]
                ],
            defaultSnippetCategory: 120,
            emailSnippetCategories: [
                [1,"Logo"],
                [14,"Call to Action"],
                [2,"Title"],
                [3,"Title, Subtitle"],
                [4,"Info, Title"],
                [7,"Paragraph"],
                [6,"Heading"],
                [8,"Buttons"],
                [9,"Callouts"],
                [10,"Images + Caption"],
                [12,"Images"],
                [13,"List"],
                [15,"Pricing"],
                [16,"Quotes"],
                [17,"Profile"],
                [18,"Contact Info"],
                [19,"Footer"],
                [20,"Separator"]
                ],
            defaultEmailSnippetCategory: 14,
            outlineMode: '',
            elementHighlight: true,
            rowTool: 'right',
            mobileSimpleEdit: false,

            /*
            DEPRECATED:
            zoom: '1',
            hiquality: false,
            scrollHelper: false,
            snippetTool: 'right',
            snippetCustomCode: false,
            onColorChanged: function () { },
            onDrop: function () { },
            snippetFile: 'assets/default/snippets.html',
            selectable: "h1,h2,h3,h4,h5,h6,p,blockquote,ul,ol,small,.edit,td,i",
            editMode: 'default',
            addSnippetCategories: [],
            enableZoom: false,
            axis: '',
            hideDragPreview: false
            */

        };

        plugin = this;

        plugin.settings = {};

        //------------- INIT --------------
        plugin.init = function () {
            plugin.settings = jQuery.extend({}, defaults, options);

            //------------- Executed Once --------------

            bIsAppleMobile = fnIsAppleMobile();

            if(bIsAppleMobile) {
                plugin.settings.dragWithoutHandle = false;
                var _screenwidth = jQuery(window).width();
                if(_screenwidth<=640) {
                    plugin.settings.buttons = ["bold", "italic", "createLink", "align"];
                    plugin.settings.buttonsMore = ["icon", "removeFormat", "html"];
                    plugin.settings.addButtonPlacement = 'between-blocks-center';
                    plugin.settings.rowHtmlEditor = false;
                    plugin.settings.toolbarDisplay = 'always';
                }
                plugin.settings.scrollableEditingToolbar = false;
                localStorage.setItem("_scrollableeditor", '0');
                plugin.settings.toolbar = 'top';
                localStorage.setItem("_editingtoolbar", 'top');
            }

            if (typeof _txt !== 'undefined') {
               bLangFile = true;
            }
            if (typeof _snippets_path !== 'undefined' && typeof jQuery.ui !== 'undefined') {
                bSideSnippets = true;
                //plugin.settings.snippetData = _snippets_path + 'snippetlist.html';
            }

            if (plugin.settings.scriptPath!='') {
                scriptPath = plugin.settings.scriptPath;
            }

            if (plugin.settings.sourceEditor==false) {//backward compatible
                plugin.settings.columnHtmlEditor=false;
            }

            if (plugin.settings.emailMode) {
                plugin.settings.outlineMode = 'row';
                if (localStorage.getItem("_outlinemode") != null) {
                    localStorage.setItem("_outlinemode", 'row');
                }
            }

            if(plugin.settings.framework=='bootstrap'){
                plugin.settings.row = 'row';
                plugin.settings.cols = ['col-md-1', 'col-md-2', 'col-md-3', 'col-md-4', 'col-md-5', 'col-md-6', 'col-md-7', 'col-md-8', 'col-md-9', 'col-md-10', 'col-md-11', 'col-md-12'];

            } else if(plugin.settings.framework=='foundation'){
                plugin.settings.row = 'row';
                plugin.settings.cols = ['large-1 columns', 'large-2 columns', 'large-3 columns', 'large-4 columns', 'large-5 columns', 'large-6 columns', 'large-7 columns', 'large-8 columns', 'large-9 columns', 'large-10 columns', 'large-11 columns', 'large-12 columns'];

            } else if(plugin.settings.framework=='material'){
                plugin.settings.row = 'mdl-grid';
                plugin.settings.cols = ['mdl-cell mdl-cell--1-col', 'mdl-cell mdl-cell--2-col', 'mdl-cell mdl-cell--3-col', 'mdl-cell mdl-cell--4-col', 'mdl-cell mdl-cell--5-col', 'mdl-cell mdl-cell--6-col', 'mdl-cell mdl-cell--7-col', 'mdl-cell mdl-cell--8-col', 'mdl-cell mdl-cell--9-col', 'mdl-cell mdl-cell--10-col', 'mdl-cell mdl-cell--11-col', 'mdl-cell mdl-cell--12-col'];

            } else if(plugin.settings.framework=='uikit'){
                cellFormat = '<div class="uk-width-1-1"></div>';
                rowFormat = '<div class="uk-grid"></div>';

            } else {
                if(plugin.settings.row !='' && plugin.settings.cols.length>0){
                    //others
                } else {

                    if(plugin.settings.cellFormat=='' && plugin.settings.rowFormat==''){
                        //basic => framework='', row='', cols=[], cellFormat='', rowFormat=''
                        plugin.settings.row = 'row clearfix';
                        plugin.settings.cols = ['column sixth', 'column fifth', 'column fourth', 'column third', 'column half', 'column two-third', 'column two-fourth', 'column two-fifth', 'column two-sixth', 'column full'];
                        plugin.settings.colequal = [
                            ['column fifth', 'column fifth', 'column fifth', 'column fifth', 'column fifth'],
                            ['column fourth', 'column fourth', 'column fourth', 'column fourth'],
	                        ['column third', 'column third', 'column third'],
	                        ['column half', 'column half']
                        ];
                        plugin.settings.colsizes = [ //needed for columns in which the size increment is not constant.
                            [   //increment for 3 columns
	                            ['column third', 'column third', 'column third'],
	                            ['column half', 'column fourth', 'column fourth']
                            ],
                            [   //increment for 2 columns
	                            ['column sixth', 'column two-sixth'],
	                            ['column fifth', 'column two-fifth'],
	                            ['column fourth', 'column two-fourth'],
	                            ['column third', 'column two-third'],
	                            ['column half', 'column half'],
	                            ['column two-third', 'column third'],
	                            ['column two-fourth', 'column fourth'],
	                            ['column two-fifth', 'column fifth'],
	                            ['column two-sixth', 'column sixth']
                            ]
                        ];
                    } else {
                        //ex. Foundation Email
                        cellFormat = plugin.settings.cellFormat;
                        rowFormat = plugin.settings.rowFormat;
                    }
                }
            }

            if(bIsAppleMobile) {
                document.addEventListener("selectionchange", function() {
                    if(checkEditable()){
                        var text = getSelected();
                        if(jQuery.trim(text)!=''){
                            plugin.saveSelection();
                        }
                    }
                }, false);
                window.addEventListener('touchmove', function(e) {
                    e.returnValue = true;
                    if (dragActive) {
                        e.preventDefault();
                    }
               },
                   {
                       passive: dragActive
                   }
               );
            }

            if (jQuery('#divFb').length == 0) {

                jQuery('body').append('<div id="divFb"></div>');

                var customtag_button = '';
                if( this.settings.customTags.length > 0 ) customtag_button = '<button class="cell-tags"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#ion-code-working"></use></svg></button>';

                var html_rte = '';
                for (var j = 0; j < plugin.settings.buttons.length; j++) {
                    var btn = this.settings.buttons[j].toLowerCase();
                    if(btn=='bold') html_rte += '<button title="' + out('Bold') + '" class="cell-format" data-command="bold"><span style="font-family:serif;font-size:14px;display:inline-block;">B</span></button>';
                    else if(btn=='italic') html_rte += '<button title="' + out('Italic') + '" class="cell-format" data-command="italic"><span style="font-family:serif;font-size:14px;font-style:italic;">i</span></button>';
                    else if(btn=='createlink') html_rte += '<button title="' + out('Hyperlink') + '" class="cell-link"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.65);width:16px;height:16px;"><use xlink:href="#ion-link"></use></svg></button>'; //<span style="font-size:17px;display:block;">&#8766;</span>
                    else if(btn=='align') html_rte += '<button title="' + out('Align') + '" class="cell-align"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;margin-top:-2px;"><use xlink:href="#icon-align-full"></use></svg></button>';
                    else if(btn=='formatpara') html_rte += '<button title="' + out('Paragraph') + '" class="cell-block"><span style="font-family:serif;font-size:14px;display:inline-block;margin-top:1px;">H</span></button>';
                    else if(btn=='color') html_rte += '<button title="' + out('Color') + '" class="cell-color"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>';
                    else if(btn=='formatting') html_rte += '<button title="' + out('Formatting') + '" class="cell-textformat"><span style="font-family:serif;font-size:15px;display:inline-block;">A</span></button>';
                    else if(btn=='list') html_rte += '<button title="' + out('List') + '" class="cell-list"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:13px;height:13px;"><use xlink:href="#icon-list-bullet"></use></svg></button>';
                    else if(btn=='textsettings') html_rte += '<button title="' + out('Text Settings') + '" class="cell-textsettings"><svg class="is-icon-flex" style="fill:rgb(0, 0, 0);width:18px;height:18px;"><use xlink:href="#ion-ios-settings"></use></svg></button>';
                    else if(btn=='icon') html_rte += '<button title="' + out('Icon') + '" class="cell-icon"><svg class="is-icon-flex" style="fill:rgb(0, 0, 0);width:14px;height:14px;"><use xlink:href="#ion-android-happy"></use></svg></button>';
                    else if(btn=='tags') html_rte += customtag_button;
                    else if(btn=='removeformat') html_rte += '<button title="' + out('Clean') + '" class="cell-clean"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:11px;height:11px;"><use xlink:href="#icon-clean"></use></svg></button>';
                    else if(btn=='font') html_rte += '<button title="' + out('Font') + '" class="cell-fontfamily"><span style="font-family:serif;font-size:20px;text-transform:none;display:inline-block;margin-top: -4px;">a</span></button>';
                    else if(btn=='image') html_rte += '<button title="' + out('Image') + '" class="cell-image"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-image"></use></svg></button>';
                    else if(btn=='gridtool') html_rte += '<button title="' + out('Grid Tool') + '" class="cell-grideditor"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:17px;height:17px;"><use xlink:href="#ion-grid"></use></svg></button>';
                    else if(btn=='html') html_rte += '<button title="' + out('HTML') + '" class="cell-viewhtml"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>';
                    else if(btn=='preferences') html_rte += '<button title="' + out('Preferences') + '" class="cell-preferences"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:14px;height:14px;"><use xlink:href="#ion-wrench"></use></svg></button>';
                    else if(btn=='addsnippet') html_rte += '<button title="' + out('Add Snippet') + '" class="cell-addsnippet"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:21px;height:21px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>';
                    else if(btn=='undo') html_rtemore += '<button title="' + out('Undo') + '" class="cell-undo"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#ion-ios-undo"></use></svg></button>';
                    else if(btn=='redo') html_rtemore += '<button title="' + out('Redo') + '" class="cell-redo"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#ion-ios-redo"></use></svg></button>';
                    else {
                        html_rte += '<button title="button not found" data-plugin="' +btn+ '">-</button>'; //temporary (later will be replaced with plugin button)
                    }
                }

                var html_rtemore = '';
                for (var j = 0; j < plugin.settings.buttonsMore.length; j++) {
                    var btn = this.settings.buttonsMore[j].toLowerCase();
                    if(btn=='createlink') html_rtemore += '<button title="' + out('Hyperlink') + '" class="cell-link"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.65);width:16px;height:16px;"><use xlink:href="#ion-link"></use></svg></button>';
                    else if(btn=='icon') html_rtemore += '<button title="' + out('Icon') + '" class="cell-icon"><svg class="is-icon-flex" style="fill:rgb(0, 0, 0);width:14px;height:14px;"><use xlink:href="#ion-android-happy"></use></svg></button>';
                    else if(btn=='removeformat') html_rtemore += '<button title="' + out('Clean') + '" class="cell-clean"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:11px;height:11px;"><use xlink:href="#icon-clean"></use></svg></button>';
                    else if(btn=='image') html_rtemore += '<button title="' + out('Image') + '" class="cell-image"><svg class="is-icon-flex" style="width:13px;height:13px;"><use xlink:href="#ion-image"></use></svg></button>';
                    else if(btn=='gridtool') html_rtemore += '<button title="' + out('Grid Tool') + '" class="cell-grideditor"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:17px;height:17px;"><use xlink:href="#ion-grid"></use></svg></button>';
                    else if(btn=='html') html_rtemore += '<button title="' + out('HTML') + '" class="cell-viewhtml"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>';
                    else if(btn=='preferences') html_rtemore += '<button title="' + out('Preferences') + '" class="cell-preferences"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:14px;height:14px;"><use xlink:href="#ion-wrench"></use></svg></button>';
                    else if(btn=='addsnippet') html_rtemore += '<button title="' + out('Add Snippet') + '" class="cell-addsnippet"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:21px;height:21px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>';
                    else if(btn=='undo') html_rtemore += '<button title="' + out('Undo') + '" class="cell-undo"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#ion-ios-undo"></use></svg></button>';
                    else if(btn=='redo') html_rtemore += '<button title="' + out('Redo') + '" class="cell-redo"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#ion-ios-redo"></use></svg></button>';
                    else {
                        html_rtemore += '<button title="button not found" data-plugin="' +btn+ '">-</button>'; //temporary (later will be replaced with plugin button)
                    }
                }

                if(this.settings.toolbarAddSnippetButton && html_rte.indexOf('cell-addsnippet')==-1 && html_rtemore.indexOf('cell-addsnippet')==-1){
                    html_rte = '<button title="' + out('Add Snippet') + '" class="cell-addsnippet"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:21px;height:21px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' + html_rte;
                }
                /*if(this.settings.toolbarViewHtmlButton && html_rte.indexOf('cell-viewhtml')==-1 && html_rtemore.indexOf('cell-viewhtml')==-1){
                    html_rtemore = html_rtemore + '<button title="' + out('HTML') + '" class="cell-viewhtml"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>';
                }
                if(this.settings.toolbarPreferencesButton && html_rte.indexOf('cell-preferences')==-1 && html_rtemore.indexOf('cell-preferences')==-1){
                    html_rtemore = html_rtemore + '<button title="' + out('Preferences') + '" class="cell-preferences"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:14px;height:14px;"><use xlink:href="#ion-ios-gear"></use></svg></button>';
                }*/
                if(html_rtemore !=''){
                    html_rte = html_rte + '<button title="' + out('More') + '" class="cell-rtemore"><svg class="is-icon-flex" style="fill: rgba(0, 0, 0, 0.7);"><use xlink:href="#ion-more"></use></svg></button>';
                }

                var html = '' +
                '<svg width="0" height="0" style="position:absolute;display:none;">' +
                    '<defs>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-left"><path d="M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-right"><path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-plus-outline"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 398.7c-105.1 0-190.7-85.5-190.7-190.7S150.9 65.3 256 65.3 446.7 150.9 446.7 256 361.1 446.7 256 446.7z"></path><path d="M264.1 128h-16.8v119.9H128v16.8h119.3V384h16.8V264.7H384v-16.8H264.1z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-image"><path d="M368 224c26.5 0 48-21.5 48-48s-21.5-48-48-48-48 21.5-48 48 21.5 48 48 48z"></path><path d="M452 64H60c-15.6 0-28 12.7-28 28.3v327.4c0 15.6 12.4 28.3 28 28.3h392c15.6 0 28-12.7 28-28.3V92.3c0-15.6-12.4-28.3-28-28.3zM348.9 261.7c-3-3.5-7.6-6.2-12.8-6.2-5.1 0-8.7 2.4-12.8 5.7L304.6 277c-3.9 2.8-7 4.7-11.5 4.7-4.3 0-8.2-1.6-11-4.1-1-.9-2.8-2.6-4.3-4.1L224 215.3c-4-4.6-10-7.5-16.7-7.5-6.7 0-12.9 3.3-16.8 7.8L64 368.2V107.7c1-6.8 6.3-11.7 13.1-11.7h357.7c6.9 0 12.5 5.1 12.9 12l.3 260.4-99.1-106.7z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-photos-outline"><path d="M96 128v320h384V128H96zm368 304H112V144h352v288z"></path><path d="M32 64v320h48v-16H48V80h352v32h16V64z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-settings-strong"><path d="M32 376h283.35c6.186-14.112 20.281-24 36.65-24s30.465 9.888 36.65 24H480v32h-91.35c-6.186 14.112-20.281 24-36.65 24s-30.465-9.888-36.65-24H32M32 240h91.35c6.186-14.112 20.281-24 36.65-24s30.465 9.888 36.65 24H480v32H196.65c-6.186 14.112-20.281 24-36.65 24s-30.465-9.888-36.65-24H32M32 104h283.35c6.186-14.112 20.281-24 36.65-24s30.465 9.888 36.65 24H480v32h-91.35c-6.186 14.112-20.281 24-36.65 24s-30.465-9.888-36.65-24H32"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-settings"><path d="M352 104c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16m0-16c-17.645 0-32 14.355-32 32s14.355 32 32 32 32-14.355 32-32-14.355-32-32-32zM352 376c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16m0-16c-17.645 0-32 14.355-32 32s14.355 32 32 32 32-14.355 32-32-14.355-32-32-32zM160 240c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16m0-16c-17.645 0-32 14.355-32 32s14.355 32 32 32 32-14.355 32-32-14.355-32-32-32zM207.32 248H480v16H207.32c.439-2.604.68-5.273.68-8s-.24-5.396-.68-8zM112 256c0 2.727.24 5.396.68 8H32v-16h80.68a47.955 47.955 0 0 0-.68 8zM399.32 384H480v16h-80.68c.439-2.604.68-5.273.68-8s-.24-5.396-.68-8zM304 392c0 2.727.24 5.396.68 8H32v-16h272.68a47.955 47.955 0 0 0-.68 8zM399.32 112H480v16h-80.68c.439-2.604.68-5.273.68-8s-.24-5.396-.68-8zM304.68 112c-.439 2.604-.68 5.273-.68 8s.24 5.396.68 8H32v-16h272.68z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-android-options"><path d="M32 384h272v32H32zM400 384h80v32h-80zM384 447.5c0 17.949-14.327 32.5-32 32.5-17.673 0-32-14.551-32-32.5v-95c0-17.949 14.327-32.5 32-32.5 17.673 0 32 14.551 32 32.5v95z"></path><g><path d="M32 240h80v32H32zM208 240h272v32H208zM192 303.5c0 17.949-14.327 32.5-32 32.5-17.673 0-32-14.551-32-32.5v-95c0-17.949 14.327-32.5 32-32.5 17.673 0 32 14.551 32 32.5v95z"></path></g><g><path d="M32 96h272v32H32zM400 96h80v32h-80zM384 159.5c0 17.949-14.327 32.5-32 32.5-17.673 0-32-14.551-32-32.5v-95c0-17.949 14.327-32.5 32-32.5 17.673 0 32 14.551 32 32.5v95z"></path></g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-list-number"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-1043.45,1024 C-1039.25,946.283 -1023.18,878.648 -995.249,821.096 C-967.313,763.544 -912.806,711.242 -831.728,664.192 L-710.742,594.247 C-656.55,562.74 -618.532,535.854 -596.687,513.589 C-562.24,478.722 -545.016,438.813 -545.016,393.863 C-545.016,341.352 -560.769,299.658 -592.276,268.781 C-623.783,237.904 -665.792,222.466 -718.304,222.466 C-796.02,222.466 -849.792,251.873 -879.619,310.685 C-895.582,342.192 -904.404,385.882 -906.084,441.754 L-1021.4,441.754 C-1020.14,363.197 -1005.65,299.133 -977.92,249.562 C-928.769,162.183 -842.02,118.494 -717.673,118.494 C-614.331,118.494 -538.82,146.43 -491.139,202.302 C-443.459,258.174 -419.619,320.347 -419.619,388.822 C-419.619,461.078 -445.034,522.831 -495.865,574.082 C-525.272,603.909 -577.993,640.037 -654.03,682.466 L-740.358,730.356 C-781.527,753.041 -813.874,774.676 -837.399,795.26 C-879.408,831.808 -905.874,872.347 -916.797,916.877 L-424.03,916.877 L-424.03,1024 L-1043.45,1024 Z "  />	<path d="M-922.391,-764.384 L-922.391,-851.343 C-840.474,-859.324 -783.341,-872.662 -750.994,-891.356 C-718.647,-910.05 -694.492,-954.265 -678.529,-1024 L-589.049,-1024 L-589.049,-125.425 L-710.035,-125.425 L-710.035,-764.384 L-922.391,-764.384 Z "  />	<path d="M-198.618,-510.942 L-198.618,-667.156 L1004.57,-667.156 L1004.57,-510.942 L-198.618,-510.942 Z "  />	<path d="M-198.618,78.1071 L-198.618,-78.1071 L1004.57,-78.1071 L1004.57,78.1071 L-198.618,78.1071 Z "  /><path d="M-179.185,649.354 L-179.185,493.14 L1024,493.14 L1024,649.354 L-179.185,649.354 Z "  /></g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-list-bullet"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-379.801,-514.33 L-379.801,-670.545 L914.662,-670.545 L914.662,-514.33 L-379.801,-514.33 Z "  /><path d="M-379.801,78.1071 L-379.801,-78.1071 L914.662,-78.1071 L914.662,78.1071 L-379.801,78.1071 Z "  /><path d="M-379.801,670.545 L-379.801,514.33 L914.662,514.33 L914.662,670.545 L-379.801,670.545 Z "  /><path d="M-929.642,-469.441 L-929.642,-715.434 L-669.092,-715.434 L-669.092,-469.441 L-929.642,-469.441 Z "  /><path d="M-929.642,127.109 L-929.642,-118.885 L-669.092,-118.885 L-669.092,127.109 L-929.642,127.109 Z "  /><path d="M-929.642,715.434 L-929.642,469.441 L-669.092,469.441 L-669.092,715.434 L-929.642,715.434 Z "  /></g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-clean"><g transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M75.0013,893.849 L-1030.73,900.993 L-32.1518,-880.838 L1009.54,-880.838 L75.0013,893.849 Z " /><path d="M-30.8571,780.685 L-845.2,787.828 L-508.893,193.749 L305.26,194.963 L-30.8571,780.685 Z " fill="#ffffff" fill-opacity="1.00" /></g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-align-full"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-770.727,738.299 L-770.727,582.085 L769.712,582.085 L769.712,738.299 L-770.727,738.299 Z " /><path d="M-770.727,-534.628 L-770.727,-690.842 L769.712,-690.842 L769.712,-534.628 L-770.727,-534.628 Z " /><path d="M-770.219,-115.563 L-770.219,-271.777 L770.219,-271.777 L770.219,-115.563 L-770.219,-115.563 Z " /><path d="M-770.219,303.503 L-770.219,147.288 L770.219,147.288 L770.219,303.503 L-770.219,303.503 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-align-center"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-770.727,738.299 L-770.727,582.085 L769.712,582.085 L769.712,738.299 L-770.727,738.299 Z " /><path d="M-552.286,-107.697 L-552.286,-263.911 L552.286,-263.911 L552.286,-107.697 L-552.286,-107.697 Z " /><path d="M-467.355,319.234 L-467.355,163.02 L466.34,163.02 L466.34,319.234 L-467.355,319.234 Z " /><path d="M-770.727,-534.628 L-770.727,-690.842 L769.712,-690.842 L769.712,-534.628 L-770.727,-534.628 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-align-left"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-770.727,738.299 L-770.727,582.085 L769.712,582.085 L769.712,738.299 L-770.727,738.299 Z " /><path d="M-770.727,-534.628 L-770.727,-690.842 L769.712,-690.842 L769.712,-534.628 L-770.727,-534.628 Z " /><path d="M-770.219,-115.563 L-770.219,-271.777 L482.839,-271.777 L482.839,-115.563 L-770.219,-115.563 Z " /><path d="M-770.219,303.503 L-770.219,147.288 L122.787,147.288 L122.787,303.503 L-770.219,303.503 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-align-right"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-770.727,738.299 L-770.727,582.085 L769.712,582.085 L769.712,738.299 L-770.727,738.299 Z " /><path d="M-770.727,-534.628 L-770.727,-690.842 L769.712,-690.842 L769.712,-534.628 L-770.727,-534.628 Z " /><path d="M-483.346,-118.081 L-483.346,-274.295 L769.712,-274.295 L769.712,-118.081 L-483.346,-118.081 Z " /><path d="M-123.871,303.503 L-123.871,147.288 L769.136,147.288 L769.136,303.503 L-123.871,303.503 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-indent"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-829.04,-514.33 L-829.04,-670.545 L808.959,-670.545 L808.959,-514.33 L-829.04,-514.33 Z " /><path d="M-829.04,670.545 L-829.04,514.33 L808.959,514.33 L808.959,670.545 L-829.04,670.545 Z " /><path d="M-254.279,-110.244 L-254.279,-266.458 L808.959,-266.458 L808.959,-110.244 L-254.279,-110.244 Z " /><path d="M-254.279,266.458 L-254.279,110.244 L808.959,110.244 L808.959,266.458 L-254.279,266.458 Z " /><path d="M-829.04,-195.117 L-490.958,-1.03508e-14 L-829.04,195.117 L-829.04,-195.117 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-outdent"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-829.04,-514.33 L-829.04,-670.545 L808.959,-670.545 L808.959,-514.33 L-829.04,-514.33 Z " /><path d="M-829.04,670.545 L-829.04,514.33 L808.959,514.33 L808.959,670.545 L-829.04,670.545 Z " /><path d="M-829.04,-110.244 L-829.04,-266.458 L234.198,-266.458 L234.198,-110.244 L-829.04,-110.244 Z " /><path d="M-829.04,266.458 L-829.04,110.244 L234.198,110.244 L234.198,266.458 L-829.04,266.458 Z " /><path d="M808.959,-195.117 L470.877,-1.03508e-14 L808.959,195.117 L808.959,-195.117 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-table"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-660.783,660.783 L660.783,660.783 L660.783,-660.783 L-660.783,-660.783 L-660.783,660.783 Z " fill="none" stroke-width="75.82" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />			<path d="M-37.9645,698.933 L37.9645,698.933 L37.9645,-698.569 L-37.9645,-698.569 L-37.9645,698.933 Z " fill="#000000" fill-opacity="1.00" stroke-width="0.25" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />			<path d="M-698.933,-37.7825 L-698.933,38.1465 L698.569,38.1465 L698.569,-37.7825 L-698.933,-37.7825 Z " fill="#000000" fill-opacity="1.00" stroke-width="0.25" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" /></g></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-android-happy"><path d="M256 48C140.563 48 48 141.6 48 256s92.563 208 208 208 208-93.6 208-208S370.401 48 256 48zm0 374.4c-91.518 0-166.404-74.883-166.404-166.4 0-91.518 74.887-166.4 166.404-166.4S422.404 164.482 422.404 256 347.518 422.4 256 422.4zm72.8-187.2c17.683 0 31.201-13.518 31.201-31.2s-13.519-31.2-31.201-31.2c-17.682 0-31.2 13.518-31.2 31.2s13.518 31.2 31.2 31.2zm-145.6 0c17.682 0 31.2-13.518 31.2-31.2s-13.519-31.2-31.2-31.2c-17.683 0-31.201 13.518-31.201 31.2s13.519 31.2 31.201 31.2zM256 370.4c48.883 0 89.436-30.164 106.081-72.801H149.919C166.564 340.236 207.117 370.4 256 370.4z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-android-create"><path d="M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-minus-empty"><path d="M384 265H128v-17h256v17z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-eye"><path d="M256 128c-81.9 0-145.7 48.8-224 128 67.4 67.7 124 128 224 128 99.9 0 173.4-76.4 224-126.6C428.2 198.6 354.8 128 256 128zm0 219.3c-49.4 0-89.6-41-89.6-91.3 0-50.4 40.2-91.3 89.6-91.3s89.6 41 89.6 91.3c0 50.4-40.2 91.3-89.6 91.3z"></path><path d="M256 224c0-7.9 2.9-15.1 7.6-20.7-2.5-.4-5-.6-7.6-.6-28.8 0-52.3 23.9-52.3 53.3s23.5 53.3 52.3 53.3 52.3-23.9 52.3-53.3c0-2.3-.2-4.6-.4-6.9-5.5 4.3-12.3 6.9-19.8 6.9-17.8 0-32.1-14.3-32.1-32z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-reply"><path d="M448 400s-36.8-208-224-208v-80L64 256l160 134.4v-92.3c101.6 0 171 8.9 224 101.9z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-redo"><path d="M64 400h10.3l19.2-31.2c20.5-32.7 44.9-62.8 75.8-76.6 24.4-10.9 46.7-18.9 86.7-20V352l192-128L256 96v80.3c-63 2.8-108.1 20.7-143.3 56.2C60.4 285.2 64 351.5 64 368.2c.1 8.9 0 21.7 0 31.8z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-wrench"><path d="M461.9 114.9l-56.5 56.7-55.1-10-9.9-55.1 56.5-56.7c-12.7-12.7-30.8-18.5-44.2-17.8-13.5.7-42.3 8.3-64.6 32-21.6 22.8-44.3 65.3-24.2 112.5 2.4 5.7 5.1 13.2-2.9 21.2-8.1 8-215 202.8-215 202.8-19.4 16.7-18 47.6-.1 65.6 18.2 17.9 48.9 19 65.6-.3 0 0 193.2-205.8 202.7-215.1 8.5-8.3 16.1-5.5 21.2-2.9 35.6 18.4 86.3 2.4 112.6-23.9 26.3-26.3 31.1-51.7 31.9-64.7.8-12.9-3.7-30-18-44.3zM91.3 443.2c-6.3 6.2-16.5 6.2-22.7 0-6.2-6.3-6.2-16.5 0-22.7 6.3-6.2 16.5-6.2 22.7 0 6.2 6.3 6.2 16.5 0 22.7z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-more"><path d="M113.7 304C86.2 304 64 282.6 64 256c0-26.5 22.2-48 49.7-48 27.6 0 49.8 21.5 49.8 48 0 26.6-22.2 48-49.8 48zM256 304c-27.5 0-49.8-21.4-49.8-48 0-26.5 22.3-48 49.8-48 27.5 0 49.7 21.5 49.7 48 0 26.6-22.2 48-49.7 48zM398.2 304c-27.5 0-49.8-21.4-49.8-48 0-26.5 22.2-48 49.8-48 27.5 0 49.8 21.5 49.8 48 0 26.6-22.2 48-49.8 48z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-code-working"><circle cx="184.166" cy="256.166" r="24"></circle><circle cx="256.166" cy="256.166" r="24"></circle><circle cx="328.166" cy="256.166" r="24"></circle><g><path d="M168 392a23.929 23.929 0 0 1-16.971-7.029l-112-112c-9.373-9.373-9.373-24.569 0-33.941l112-112c9.373-9.372 24.568-9.372 33.941 0 9.371 9.372 9.371 24.568 0 33.941L89.941 256l95.029 95.029c9.371 9.372 9.371 24.568 0 33.941A23.925 23.925 0 0 1 168 392zM344 392a23.929 23.929 0 0 0 16.971-7.029l112-112c9.373-9.373 9.373-24.569 0-33.941l-112-112c-9.373-9.372-24.568-9.372-33.941 0-9.371 9.372-9.371 24.568 0 33.941L422.059 256l-95.029 95.029c-9.371 9.372-9.371 24.568 0 33.941A23.925 23.925 0 0 0 344 392z"></path></g></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-gear"><path d="M416.349 256.046c-.001-21.013 13.143-38.948 31.651-46.062a196.302 196.302 0 0 0-23.664-57.139 49.423 49.423 0 0 1-20.082 4.254c-12.621 0-25.238-4.811-34.871-14.442-14.863-14.863-18.248-36.846-10.18-54.97A196.274 196.274 0 0 0 302.074 64C294.971 82.529 277.027 95.69 256 95.69c-21.025 0-38.969-13.161-46.073-31.69a196.243 196.243 0 0 0-57.128 23.688c8.068 18.122 4.683 40.104-10.181 54.97-9.631 9.631-22.25 14.443-34.871 14.443a49.429 49.429 0 0 1-20.083-4.255A196.273 196.273 0 0 0 64 209.984c18.509 7.112 31.652 25.049 31.652 46.062 0 21.008-13.132 38.936-31.63 46.054a196.318 196.318 0 0 0 23.692 57.128 49.428 49.428 0 0 1 20.032-4.232c12.622 0 25.239 4.812 34.871 14.443 14.841 14.841 18.239 36.781 10.215 54.889a196.257 196.257 0 0 0 57.13 23.673c7.128-18.479 25.046-31.596 46.038-31.596 20.992 0 38.91 13.115 46.037 31.596a196.234 196.234 0 0 0 57.132-23.675c-8.023-18.106-4.626-40.046 10.216-54.887 9.629-9.632 22.248-14.444 34.868-14.444 6.836 0 13.67 1.411 20.033 4.233a196.318 196.318 0 0 0 23.692-57.128c-18.498-7.119-31.629-25.048-31.629-46.054zM256.9 335.9c-44.3 0-80-35.9-80-80 0-44.101 35.7-80 80-80 44.299 0 80 35.899 80 80 0 44.1-35.701 80-80 80z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-arrow-expand"><path d="M274 209.7l63.9-63.8L288 96h128v128l-49.9-49.9-63.8 63.9zM274 302.3l63.9 63.8L288 416h128V288l-49.9 49.9-63.8-63.9zM238 302.3l-63.9 63.8L224 416H96V288l49.9 49.9 63.8-63.9zM238 209.7l-63.9-63.8L224 96H96v128l49.9-49.9 63.8 63.9z"></path></symbol>' +
                        /*'<symbol viewBox="0 0 2048.0 2048.0" id="icon-decrease"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-968.866,73.5736 L-968.866,25.6601 L-174.585,25.6601 L-174.585,73.5736 L-968.866,73.5736 Z " fill="#000000" fill-opacity="1.00" /><path d="M-709.586,617.809 L-743.466,583.929 L-181.825,22.2871 L-147.945,56.167 L-709.586,617.809 Z " fill="#000000" fill-opacity="1.00" /><path d="M-743.466,-473.663 L-709.586,-507.543 L-147.945,54.0986 L-181.825,87.9786 L-743.466,-473.663 Z " fill="#000000" fill-opacity="1.00" /><path d="M943.66,87.9786 L943.66,40.0651 L149.379,40.0651 L149.379,87.9786 L943.66,87.9786 Z " fill="#000000" fill-opacity="1.00" /><path d="M684.38,632.214 L718.26,598.334 L156.619,36.692 L122.739,70.572 L684.38,632.214 Z " fill="#000000" fill-opacity="1.00" />			<path d="M718.26,-459.258 L684.38,-493.138 L122.739,68.5035 L156.618,102.384 L718.26,-459.258 Z " fill="#000000" fill-opacity="1.00" /></g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-increase"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M-147.945,73.5736 L-147.945,25.6601 L-942.226,25.6601 L-942.226,73.5736 L-147.945,73.5736 Z " fill="#000000" fill-opacity="1.00" /><path d="M-407.224,617.809 L-373.344,583.929 L-934.986,22.2871 L-968.866,56.167 L-407.224,617.809 Z " fill="#000000" fill-opacity="1.00" /><path d="M-373.344,-473.663 L-407.224,-507.543 L-968.866,54.0986 L-934.986,87.9786 L-373.344,-473.663 Z " fill="#000000" fill-opacity="1.00" /><path d="M122.739,87.9786 L122.739,40.0651 L917.02,40.0651 L917.02,87.9786 L122.739,87.9786 Z " fill="#000000" fill-opacity="1.00" /><path d="M382.018,632.214 L348.138,598.334 L909.78,36.692 L943.66,70.572 L382.018,632.214 Z " fill="#000000" fill-opacity="1.00" />			<path d="M348.138,-459.258 L382.018,-493.138 L943.66,68.5035 L909.78,102.384 L348.138,-459.258 Z " fill="#000000" fill-opacity="1.00" /></g></symbol>' +
                        */'<symbol viewBox="0 0 512 512" id="ion-android-expand"><path d="M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-arrow-move"><path d="M480 256l-96-96v76H276V128h76l-96-96-96 96h76v108H128v-76l-96 96 96 96v-76h108v108h-76l96 96 96-96h-76.2l-.4-108.5 108.6.3V352z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-drag"><path d="M0 144h512v32H0zM0 240h512v32H0zM0 336h512v32H0z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-link"><path d="M74.6 256c0-38.3 31.1-69.4 69.4-69.4h88V144h-88c-61.8 0-112 50.2-112 112s50.2 112 112 112h88v-42.6h-88c-38.3 0-69.4-31.1-69.4-69.4zm85.4 22h192v-44H160v44zm208-134h-88v42.6h88c38.3 0 69.4 31.1 69.4 69.4s-31.1 69.4-69.4 69.4h-88V368h88c61.8 0 112-50.2 112-112s-50.2-112-112-112z"/></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-contrast"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm135.8 359.8C355.5 428 307 448 256 448V64c51 0 99.5 20 135.8 56.2C428 156.5 448 204.7 448 256c0 51.3-20 99.5-56.2 135.8z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-plus-empty"><path d="M384 265H264v119h-17V265H128v-17h119V128h17v120h120v17z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-thin-up"><path d="M349.7 189.8c-3.1 3.1-8 3-11.3 0L264 123.4V408c0 4.4-3.6 8-8 8s-8-3.6-8-8V123.4l-74.4 66.3c-3.4 2.9-8.1 3.2-11.2.1-3.1-3.1-3.3-8.5-.1-11.4 0 0 87-79.2 88-80s2.8-2.4 5.7-2.4 4.9 1.6 5.7 2.4 88 80 88 80c1.5 1.5 2.3 3.6 2.3 5.7s-.8 4.1-2.3 5.7z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-thin-down"><path d="M349.7 322.2c-3.1-3.1-8-3-11.3 0L264 388.6V104c0-4.4-3.6-8-8-8s-8 3.6-8 8v284.6l-74.4-66.3c-3.4-2.9-8.1-3.2-11.2-.1-3.1 3.1-3.3 8.5-.1 11.4 0 0 87 79.2 88 80s2.8 2.4 5.7 2.4 4.9-1.6 5.7-2.4 88-80 88-80c1.5-1.5 2.3-3.6 2.3-5.7s-.8-4.1-2.3-5.7z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-thin-left"><path d="M189.8 349.7c3.1-3.1 3-8 0-11.3L123.4 264H408c4.4 0 8-3.6 8-8s-3.6-8-8-8H123.4l66.3-74.4c2.9-3.4 3.2-8.1.1-11.2-3.1-3.1-8.5-3.3-11.4-.1 0 0-79.2 87-80 88S96 253.1 96 256s1.6 4.9 2.4 5.7 80 88 80 88c1.5 1.5 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-arrow-thin-right"><path d="M322.2 349.7c-3.1-3.1-3-8 0-11.3l66.4-74.4H104c-4.4 0-8-3.6-8-8s3.6-8 8-8h284.6l-66.3-74.4c-2.9-3.4-3.2-8.1-.1-11.2 3.1-3.1 8.5-3.3 11.4-.1 0 0 79.2 87 80 88s2.4 2.8 2.4 5.7-1.6 4.9-2.4 5.7-80 88-80 88c-1.5 1.5-3.6 2.3-5.7 2.3s-4.1-.8-5.7-2.3z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-close-empty"><path d="M340.2 160l-84.4 84.3-84-83.9-11.8 11.8 84 83.8-84 83.9 11.8 11.7 84-83.8 84.4 84.2 11.8-11.7-84.4-84.3 84.4-84.2z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-android-more-vertical"><path d="M296 136c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0 240c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0-120c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-quote"><path d="M192 64c-40.646 0-72.483 11.229-94.627 33.373C75.229 119.517 64 151.354 64 192v256h160V192h-96c0-23.056 4.922-39.666 14.627-49.373C152.334 132.922 168.944 128 192 128M416 64c-40.646 0-72.483 11.229-94.627 33.373C299.229 119.517 288 151.354 288 192v256h160V192h-96c0-23.056 4.922-39.666 14.627-49.373C376.334 132.922 392.944 128 416 128"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-code"><path d="M168 392a23.929 23.929 0 0 1-16.971-7.029l-112-112c-9.373-9.373-9.373-24.569 0-33.941l112-112c9.373-9.372 24.568-9.372 33.941 0 9.371 9.372 9.371 24.568 0 33.941L89.941 256l95.029 95.029c9.371 9.373 9.371 24.568 0 33.941A23.925 23.925 0 0 1 168 392zM344 392a23.929 23.929 0 0 0 16.971-7.029l112-112c9.373-9.373 9.373-24.569 0-33.941l-112-112c-9.373-9.372-24.568-9.372-33.941 0-9.371 9.372-9.371 24.568 0 33.941L422.059 256l-95.029 95.029c-9.371 9.373-9.371 24.568 0 33.941A23.925 23.925 0 0 0 344 392z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-camera"><path d="M430.4 147h-67.5l-40.4-40.8s-.2-.2-.3-.2l-.2-.2c-6-6-14.1-9.8-23.3-9.8h-84c-9.8 0-18.5 4.2-24.6 10.9v.1l-39.5 40h-69C63 147 48 161.6 48 180.2v202.1c0 18.6 15 33.7 33.6 33.7h348.8c18.5 0 33.6-15.1 33.6-33.7V180.2c0-18.6-15.1-33.2-33.6-33.2zM256 365.5c-50.9 0-92.4-41.6-92.4-92.6 0-51.1 41.5-92.6 92.4-92.6 51 0 92.4 41.5 92.4 92.6 0 51-41.4 92.6-92.4 92.6zm168.1-165c-7.7 0-14-6.3-14-14.1s6.3-14.1 14-14.1 14 6.3 14 14.1-6.3 14.1-14 14.1z"></path><path d="M256 202.9c-38.6 0-69.8 31.3-69.8 70 0 38.6 31.2 70 69.8 70 38.5 0 69.8-31.3 69.8-70s-31.3-70-69.8-70z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-move"><path d="M475.9 246.2l-79.4-79.4c-5.4-5.4-14.2-5.4-19.6 0l-.2.2c-5.4 5.4-5.4 14.2 0 19.6l54.9 54.9-161.8.5.5-161.8 54.9 54.9c5.4 5.4 14.2 5.4 19.6 0l.2-.2c5.4-5.4 5.4-14.2 0-19.6l-79.4-79.4c-5.4-5.4-14.2-5.4-19.6 0l-79.4 79.4c-5.4 5.4-5.4 14.2 0 19.6l.2.2c5.4 5.4 14.2 5.4 19.6 0l54.9-54.9.5 161.8-161.8-.5 54.9-54.9c5.4-5.4 5.4-14.2 0-19.6l-.2-.2c-5.4-5.4-14.2-5.4-19.6 0l-79.4 79.4c-5.4 5.4-5.4 14.2 0 19.6l79.4 79.4c5.4 5.4 14.2 5.4 19.6 0l.2-.2c5.4-5.4 5.4-14.2 0-19.6L80 270.5l161.8-.5-.5 161.8-54.9-54.9c-5.4-5.4-14.2-5.4-19.6 0l-.2.2c-5.4 5.4-5.4 14.2 0 19.6l79.4 79.4c5.4 5.4 14.2 5.4 19.6 0l79.4-79.4c5.4-5.4 5.4-14.2 0-19.6l-.2-.2c-5.4-5.4-14.2-5.4-19.6 0l-54.9 54.9-.5-161.8 161.8.5-54.9 54.9c-5.4 5.4-5.4 14.2 0 19.6l.2.2c5.4 5.4 14.2 5.4 19.6 0l79.4-79.4c5.5-5.4 5.5-14.2 0-19.6z"/></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-ok"><rect x="0" y="0" width="2048.00" height="2048.00" fill="#ffffff" /><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)"><path d="M330.323,493.628 L330.323,398.406 L-330.323,398.406 L-330.323,493.628 L330.323,493.628 Z " fill="#011534" fill-opacity="1.00" />			<path d="M230.718,468.568 L328.59,468.568 L328.59,-599.718 L230.718,-599.718 L230.718,468.568 Z " fill="#011534" fill-opacity="1.00" />			<path d="M-300.714,376.053 L-373.748,449.088 L-68.5805,754.255 L4.45387,681.221 L-300.714,376.053 Z " fill="#011534" fill-opacity="1.00" />			<path d="M-9.9476e-14,216.241 L-73.0344,143.207 L-378.202,448.375 L-305.168,521.409 L-9.9476e-14,216.241 Z " fill="#011534" fill-opacity="1.00" /></g></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-grid"><path d="M160 153.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5zM288 153.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5zM416 153.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5z"></path><g><path d="M160 281.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5zM288 281.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5zM416 281.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5z"></path></g><g><path d="M160 409.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5zM288 409.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5zM416 409.3c0 3.7-3 6.7-6.7 6.7h-50.5c-3.7 0-6.7-3-6.7-6.7v-50.5c0-3.7 3-6.7 6.7-6.7h50.5c3.7 0 6.7 3 6.7 6.7v50.5z"></path></g></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-gear-b"><path d="M448 294.4v-76.8h-42.8c-3.4-14.4-8.9-28-16.1-40.5l29.8-29.7-54.3-54.3-29.1 29.1c-12.6-7.7-26.4-13.5-41.1-17.3V64h-76.8v40.9c-14.7 3.8-28.5 9.7-41.1 17.3l-29.1-29.1-54.3 54.3 29.8 29.7c-7.2 12.5-12.6 26.1-16.1 40.5H64v76.8h44.1c3.8 13.7 9.5 26.6 16.7 38.6l-31.7 31.7 54.3 54.3 32.3-32.3c11.7 6.8 24.5 11.9 37.9 15.4v46h76.8v-46c13.5-3.5 26.2-8.6 37.9-15.4l32.3 32.3 54.3-54.3-31.6-31.7c7.2-11.9 12.9-24.8 16.7-38.6h44zm-192 15.4c-29.7 0-53.7-24.1-53.7-53.8s24-53.8 53.7-53.8 53.8 24.1 53.8 53.8-24.1 53.8-53.8 53.8z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-grid-view-outline"><path d="M448 192v-16H336V64h-16v112H192V64h-16v112H64v16h112v128H64v16h112v112h16V336h128v112h16V336h112v-16H336V192h112zM320 320H192V192h128v128z"></path></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-increase"><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)">			<path d="M852.574,595.004 L852.574,507.837 L-852.574,507.837 L-852.574,595.004 L852.574,595.004 Z " />			<path d="M852.574,224.232 L852.574,137.066 L-852.574,137.066 L-852.574,224.232 L852.574,224.232 Z " />			<path d="M852.574,-134.971 L852.574,-222.138 L-852.574,-222.138 L-852.574,-134.971 L852.574,-134.971 Z " />			<path d="M852.574,-505.743 L852.574,-592.909 L-852.574,-592.909 L-852.574,-505.743 L852.574,-505.743 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 2048.0 2048.0" id="icon-decrease"><g id="document" transform="matrix(1,0,0,1,1024.0,1024.0)">			<path d="M509.832,595.004 L509.832,507.837 L-509.832,507.837 L-509.832,595.004 L509.832,595.004 Z " />			<path d="M509.832,224.232 L509.832,137.066 L-509.832,137.066 L-509.832,224.232 L509.832,224.232 Z " />			<path d="M509.832,-136.947 L509.832,-224.113 L-509.832,-224.113 L-509.832,-136.947 L509.832,-136.947 Z " />			<path d="M509.832,-505.743 L509.832,-592.909 L-509.832,-592.909 L-509.832,-505.743 L509.832,-505.743 Z " />		</g></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-undo"><path d="M447.9 368.2c0-16.8 3.6-83.1-48.7-135.7-35.2-35.4-80.3-53.4-143.3-56.2V96L64 224l192 128v-79.8c40 1.1 62.4 9.1 86.7 20 30.9 13.8 55.3 44 75.8 76.6l19.2 31.2H448c0-10.1-.1-22.9-.1-31.8z"></path></symbol>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-redo"><path d="M64 400h10.3l19.2-31.2c20.5-32.7 44.9-62.8 75.8-76.6 24.4-10.9 46.7-18.9 86.7-20V352l192-128L256 96v80.3c-63 2.8-108.1 20.7-143.3 56.2C60.4 285.2 64 351.5 64 368.2c.1 8.9 0 21.7 0 31.8z"></path></symbol>' +
                        '</defs>' +
                '</svg>' +
                '' +
                '<div id="divRteTool" class="is-tool" style="position:fixed;display:none;">' +
                    '<div class="is-draggable" style="width: 5px;height: 50px;background: #f6f2f2;cursor: move;"></div>' +
                    '<button title="' + out('Previous') + '" class="cell-tool-prev" style="width:35px;"><svg class="is-icon-flex" style="width:13px;height:13px"><use xlink:href="#ion-ios-arrow-left"></use></svg></button>' +
                    '<div class="cell-tool-option-container">' +
                        '<div>' +
                            html_rte +
                        '</div>' +
                    '</div>' +
                    '<button title="' + out('Next') + '" class="cell-tool-next" style="width:35px;"><svg class="is-icon-flex" style="width:13px;height:13px"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divCellTool" class="is-tool">' +
                    '<button title="' + out('More') + '" class="cell-tool-menu" style="background:rgba(0,0,0,0.03);font-size:19px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.55);width:18px;height:18px;"><use xlink:href="#ion-android-more-vertical"></use></svg></button>' +
                    '<div class="cell-move-options" style="display:block">' +
                        '<button title="' + out('Move Left') + '" class="cell-prev"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-left"></use></svg></button>' +
                        '<button title="' + out('Move Right') + '" class="cell-next"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-right"></use></svg></button>' +
                        '<button title="' + out('HTML') + '" class="cell-html"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                        '<button title="' + out('Delete') + '" class="cell-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div id="divCellToolMenu" class="is-tool is-pop" style="box-sizing:border-box;height:auto;overflow:hidden;transition:none;">' +
                    '<button title="' + out('Add') + '" class="cell-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:21px;height:21px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                    '<button title="' + out('Move Up') + '" class="cell-up"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>' +
                    '<button title="' + out('Move Down') + '" class="cell-down"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>' +
                    '<button title="' + out('Duplicate') + '" class="cell-duplicate"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                    '<button title="' + out('Increase') + '" class="cell-increase"><svg class="is-icon-flex"><use xlink:href="#icon-increase"></use></svg></button>' +
                    '<button title="' + out('Decrease') + '" class="cell-decrease"><svg class="is-icon-flex"><use xlink:href="#icon-decrease"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divRowAddTool" class="" style="">' +
                    '<button title="' + out('Add') + '" style="outline:none;line-height:1;margin:0;padding:0;cursor:pointer;background-color:#fff;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:17px;height:17px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                '</div>' +
                '' +
                '<div class="cell-add-options arrow-top is-pop">' +
                    '<div class="is-pop-close" style="display:none;z-index:1;width:40px;height:40px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:40px;font-size: 12px;color:#777;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.47);width:40px;height:40px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div>' +
                    '<button title="' + out('Paragraph') + '" class="cell-add-paragraph"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#icon-align-full"></use></svg></span>' + out('Paragraph') + '</button>' +
                    '<button title="' + out('Headline') + '" class="cell-add-headline"><span style="font-family:serif;display:block;margin:0 0 8px;">H</span>' + out('Headline') + '</button>' +
                    '<button title="' + out('Image') + '" class="cell-add-image"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex ion-image" style="width:14px;height:14px;"><use xlink:href="#ion-image"></use></svg></span>' + out('Image') + '</button>' +
                    '<button title="' + out('Heading 1') + '" class="cell-add-heading1"><span style="font-family:serif;display:block;margin:0 0 8px;">H1</span>' + out('Heading 1') + '</button>' +
                    '<button title="' + out('Heading 2') + '" class="cell-add-heading2"><span style="font-family:serif;display:block;margin:0 0 8px;">H2</span>' + out('Heading 2') + '</button>' +
                    '<button title="' + out('Heading 3') + '" class="cell-add-heading3"><span style="font-family:serif;display:block;margin:0 0 8px;">H3</span>' + out('Heading 3') + '</button>' +
                    '<button title="' + out('List') + '" class="cell-add-list"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:13px;height:13px;"><use xlink:href="#icon-list-bullet"></use></svg></span>List</button>' +
                    '<button title="' + out('Quote') + '" class="cell-add-quote"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:13px;height:13px;"><use xlink:href="#ion-quote"></use></svg></span>' + out('Quote') + '</button>' +
                    '<button title="' + out('Preformatted') + '" class="cell-add-preformatted"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:13px;height:13px;"><use xlink:href="#ion-code"></use></svg></span>' + out('Preformatted') + '</button>' +
                    '<button title="' + out('Table') + '" class="cell-add-table"><span style="display:block;margin:0 0 8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#icon-table"></use></svg></use></svg></svg></span>' + out('Table') + '</button>' +
                    '<button title="' + out('Spacer') + '" class="cell-add-spacer"><span style="display:block;margin:0 0 8px;"><span style="display:inline-block;background:#eee;width:30px;height:5px;"></span></span>' + out('Spacer') + '</button>' +
                    '<button title="' + out('Button') + '" class="cell-add-button"><span style="display:block;margin:0 0 8px;"><span style="display:inline-block;border:#a1a1a1 1px solid;background:#f3f3f3;width:15px;height:6px;"></span></span>' + out('Button') + '</button>' +
                    /*'<button title="' + out('Horizontal Line') + '" class="cell-add-hr"><span style="display:block;margin:0 0 8px;"><span style="display:inline-block;background:#a1a1a1;width:30px;height:1px;"></span></span>' + out('Line') + '</button>' + */
                    '<button title="' + out('More...') + '" class="cell-add-more classic" style="width:100%;height:45px;margin-top:10px;">' + out('More...') + '</button>' +
                '</div>' +
                '' +
                '<div class="cell-rtemore-options arrow-top right is-pop">' +
                    html_rtemore +
                '</div>' +
                '' +
                '<div class="cell-align-options arrow-top is-pop">' +
                    '<button title="' + out('Align Left') + '" data-align="left"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:14px;height:14px;"><use xlink:href="#icon-align-left"></use></svg></button>' +
                    '<button title="' + out('Align Center') + '" data-align="center"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:14px;height:14px;"><use xlink:href="#icon-align-center"></use></svg></button>' +
                    '<button title="' + out('Align Right') + '" data-align="right"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:14px;height:14px;"><use xlink:href="#icon-align-right"></use></svg></button>' +
                    '<button title="' + out('Align Full') + '" data-align="justify"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:14px;height:14px;"><use xlink:href="#icon-align-full"></use></svg></button>' +
                '</div>' +
                '' +
                '<div class="cell-list-options arrow-top is-pop">' +
                    '<button title="' + out('Bullets') + '" data-action="insertUnorderedList"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#icon-list-bullet"></use></svg></button>' +
                    '<button title="' + out('Numbering') + '" data-action="insertOrderedList"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);"><use xlink:href="#icon-list-number"></use></svg></button>' +
                    '<button title="' + out('Indent') + '" data-action="indent"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);"><use xlink:href="#icon-indent"></use></svg></button>' +
                    '<button title="' + out('Outdent') + '" data-action="outdent"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);"><use xlink:href="#icon-outdent"></use></svg></use></svg></svg></button>' +
                '</div>' +
                '' +
                '<div class="cell-block-options arrow-top is-pop">' +
                    '<div>' +
                        '<div title="' + out('Heading 1') + '" data-block="h1"><h1>Heading 1</h1></div>' +
                        '<div title="' + out('Heading 2') + '" data-block="h2"><h2>Heading 2</h2></div>' +
                        '<div title="' + out('Heading 3') + '" data-block="h3"><h3>Heading 3</h3></div>' +
                        '<div title="' + out('Heading 4') + '" data-block="h4"><h4>Heading 4</h4></div>' +
                        '<div title="' + out('Paragraph') + '" data-block="p"><p>Paragraph</p></div>' +
                        '<div title="' + out('Preformatted') + '" data-block="pre"><p style="font-family:courier;">Preformatted</p></div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="cell-textformat-options arrow-top is-pop">' +
                    '<button title="' + out('Underline') + '" class="cell-format" data-command="underline" style="float:left"><span style="font-family:serif;line-height:50px;font-size:15px;text-decoration:underline;display:inline-block;margin-top:-2px;">U</span></button>' +
                    '<button title="' + out('Strikethrough') + '" class="cell-format" data-command="strikethrough" style="float:left"><span style="font-family:serif;line-height:50px;font-size:19px;text-decoration:line-through;display:inline-block;margin-top:-1px;">S</span></button>' +
                    '<button title="' + out('Superscript') + '" class="cell-format" data-command="superscript" style="float:left"><span style="font-family:serif;line-height:50px;font-size:14px;">x</span style=""><sup style="font-size:10px">2</sup></button>' +
                    '<button title="' + out('Subscript') + '" class="cell-format" data-command="subscript" style="float:left"><span style="font-family:serif;line-height:50px;font-size:14px;">x</span style=""><sub style="font-size:10px">2</sub></button>' +
                    '<button title="' + out('Uppercase') + '" class="cell-format" data-command="uppercase" style="float:left"><span style="font-family:serif;line-height:50px;font-size:16px;display:inline-block;text-transform: none;">Aa</span></button>' +
                '</div>' +
                '' +
                '<div class="cell-textsetting-options arrow-top is-pop">' +
                    '<div style="margin-top:-5px">Font size: </div>' +
                    '<div class="div-font-size">' +
                        '<button title="' + out('Decrease') + '" data-value="-">-</button>' +
                        '<button title="' + out('Increase') + '" data-value="+" style="border-left: none;">+</button>' +
                        '<button title="' + out('Clear') + '" data-value="" style="border-left: none;font-size: 12px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                        '<button title="' + out('Choose..') + '" data-value="more" style="font-size:12px;width:100%;margin-top:10px;height:40px;">' + out('Choose..') + '</button>' +
                    '</div>' +
                    '<div style="margin-top:5px">Line height: </div>' +
                    '<div class="div-line-height">' +
                        '<button title="' + out('Decrease') + '" data-value="-">-</button>' +
                        '<button title="' + out('Increase') + '" data-value="+" style="border-left: none;">+</button>' +
                        '<button title="' + out('Clear') + '" data-value="" style="border-left: none;font-size: 12px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                    '</div>' +
                    '<div style="margin-top:5px">Letter spacing: </div>' +
                    '<div class="div-letter-spacing">' +
                        '<button title="' + out('Decrease') + '" data-value="-">-</button>' +
                        '<button title="' + out('Increase') + '" data-value="+" style="border-left: none;">+</button>' +
                        '<button title="' + out('Clear') + '" data-value="" style="border-left: none;font-size: 12px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="cell-fontfamily-options arrow-top is-pop" style="width:200px;height:200px;">' +
                    '<iframe src="about:blank" style="width:100%;height:100%;border: none;"></iframe>' +
                '</div>' +
                '' +
                '<div class="cell-color-options arrow-top is-pop" data-mode="forecolor">' +
                    '<button title="' + out('Forecolor') + '" data-mode="forecolor" class="input-mode active" style="">' + out('Forecolor') + '</button>' +
                    '<button title="' + out('Backcolor') + '" data-mode="backcolor" class="input-mode" style="">' + out('Backcolor') + '</button>' +
                    '[COLORS]' +
                    '<br style="clear:both">' +
                    '<div class="clearfix" style="width:315px;height:45px;overflow:hidden;position:relative;">' +
                        '<div class="gradient" style="width:630px;height:45px;;position:absolute;top:0;transition: all ease 0.3s;">[GRADIENT]</div>' +
                    '</div>' +
                    '<button data-color="#ffffff" style="background:#ffffff;border:#e7e7e7 1px solid;width:90px"><span style="position:absolute;top:0;left:0;width:100%;height:100%;border:#f8f8f8 1px solid;box-sizing: border-box;line-height:41px;font-size:10px;">White</span></button>' +
                    '<button title="' + out('Clear') + '" data-color="" class="clear classic" style="">' + out('Clear') + '</button>' +
                    '<button title="' + out('More') + '" class="input-more classic" style="font-size:20px;color:#777;"><svg class="is-icon-flex" style="width:13px;height:13px;transform: rotateZ(90deg);"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                    '<div class="more clearfix" style="display:flex">' +
                        '<button class="is-color-preview" style="width:45px;height:45px;border:1px solid rgba(53, 53, 53, 0.28);border-right:none;box-sizing:border-box;margin-top:8px;"></button>' +
                        '<input class="input-text" type="text" style="width:225px;margin-top:8px;"/>' +
                        '<button title="' + out('Apply') + '" class="input-ok" style="border: 1px solid rgb(199, 199, 199);border-left:none;margin-top:8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);"><use xlink:href="#icon-ok"></use></svg></use></svg></svg></button>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="cell-tag-options arrow-top is-pop">' +
                    '<div id="divCustomTags" style="width:100%;"></div>' +
                '</div>' +
                '' +
                '<div id="divSpacerTool" class="is-tool">' +
                    /*'<div class="label">Spacer</div>' +*/
                    '<button title="' + out('Decrease') + '" data-value="-">-</button>' +
                    '<button title="' + out('Increase') + '" data-value="+" style="border-left: none;">+</button>' +
                '</div>' +
                '' +
                '<div id="divImageTool" class="is-tool" style="background:rgba(0, 0, 0, 0.15);border:transparent 1px solid;">' +
                    '<div class="image-embed" style="width:40px;height:40px;overflow:hidden;">' +
                        '<div style="position:absolute;width:100%;height:100%;"><svg class="is-icon-flex" style="position: absolute;top: 13px;left: 15px;width: 14px;height: 14px;fill:rgb(255,255,255);"><use xlink:href="#ion-image"></use></svg></div>' +
                        '<input title="' + out('Change Image') + '" id="fileEmbedImage" type="file" accept="image/*" style="position:absolute;top:0px;left:0;width:100%;height:40px;opacity: 0;cursor: pointer;"/>' +
                    '</div>' +
                    '<button title="' + out('Link') + '" class="image-link" style="width:40px;height:40px;background:none;color:#fff;"><svg class="is-icon-flex" style="fill:rgba(255, 255, 255, 0.95);width:17px;height:17px;"><use xlink:href="#ion-link"></use></svg></button>' +
                    '<button title="' + out('Edit') + '" class="image-edit" style="width:40px;height:40px;background:none;color:#fff;"><svg class="is-icon-flex" style="fill:rgb(255,255,255);width:14px;height:14px;"><use xlink:href="#ion-android-create"></use></svg></button>' +
                '</div>' +
                '<div id="divImageProgress">' +
                    '<div>' +
                        '<div class="dot"></div>' +
                        '<div class="dot"></div>' +
                        '<div class="dot"></div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div id="divIframeTool" class="is-tool">' +
                    '<button title="' + out('Source') + '" class="iframe-link" style="width:50px;height:50px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.65);width:17px;height:17px;"><use xlink:href="#ion-link"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divCustomCodeTool" class="is-tool">' +
                    '<button title="' + out('Settings') + '" style="width:50px;height:50px;"><svg class="is-icon-flex" style="width:18px;height:18px;fill: rgba(0, 0, 0, 0.7);"><use xlink:href="#ion-ios-gear"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divCustomModuleTool" class="is-tool">' +
                    '<button title="' + out('Settings') + '" style="width:50px;height:50px;"><svg class="is-icon-flex" style="width:18px;height:18px;fill: rgba(0, 0, 0, 0.7);"><use xlink:href="#ion-ios-gear"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divLinkTool" class="is-tool">' +
                    '<button title="' + out('Link') + '" class="link-edit" style="width:37px;height:30px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.65);width:16px;height:16px;"><use xlink:href="#ion-link"></use></svg></button>' +
                    '<button title="' + out('Duplicate') + '" class="link-duplicate" style="width:37px;height:30px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                    '<button title="' + out('Delete') + '" class="link-remove" style="width:37px;height:30px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divIconTool" class="is-tool">' +
                    '<button title="' + out('Change Icon') + '" class="icon-type"><svg class="is-icon-flex" style="width:17px;height:17px"><use xlink:href="#ion-android-happy"></use></svg></button>' +
                    '<button title="' + out('Link') + '" class="icon-link"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.65);width:16px;height:16px;"><use xlink:href="#ion-link"></use></svg></button>' +
                    '<button title="' + out('Add') + '" class="icon-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:19px;height:19px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                    '<button title="' + out('Delete') + '" class="icon-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divTableTool" class="is-tool">' +
                    '<button title="' + out('Edit Table') + '" class="icon-type" style="width:40px;height:40px;"><svg class="is-icon-flex" style="margin-top: 3px;fill:rgba(0, 0, 0, 0.8)"><use xlink:href="#ion-android-create"></use></svg></button>' +
                '</div>' +
                '' +
                '<div id="divElementTool" class="is-tool">' +
                    '<button title="' + out('Add') + '" class="element-add" style="width:35px;height:25px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:16px;height:16px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                    '<button title="' + out('Duplicate') + '" class="element-duplicate" style="width:35px;height:25px;"><svg class="is-icon-flex" style="width:10px;height:10px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                    '<button title="' + out('Move Up') + '" class="element-up" style="width:35px;height:25px;font-size: 11px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.9);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>' +
                    '<button title="' + out('Move Down') + '" class="element-down" style="width:35px;height:25px;font-size: 11px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.9);width:12px;height:12px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>' +
                    (plugin.settings.elementEditor ?
                    '<button title="' + out('Settings') + '" class="element-edit" style="width:35px;height:25px;font-size: 11px;"><svg class="is-icon-flex" style="width:11px;height:11px;fill: rgba(0, 0, 0, 0.6);"><use xlink:href="#ion-ios-gear"></use></svg></button>' :
                    '') +
                    '<button title="' + out('Delete') + '" class="element-remove" style="width:35px;height:25px;font-size: 11px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:19px;height:19px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                '</div>' +
                '' +
                '<div class="is-modal createlink">' +
                    '<div style="max-width:526px;">' +
                        '<div class="link-src">' +
                            '<input class="input-url" type="text" placeholder="Url"/>' +
                            '<button title="' + out('Select') + '" class="input-select"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>' +
                        '</div>' +
                        '<label style="display:inline-block;margin-top:14px;margin-bottom:10px;float:left;">' +
                            '<input class="input-newwindow" type="checkbox" /> ' + out('Open New Window') + '&nbsp;' +
                        '</label>' +
                        '<input class="input-text" type="text" placeholder="' + out('Text') + '" style="width:100%;"/>' +
                        '<input class="input-title" type="text" placeholder="' + out('Title') + '" style="width:100%;border-top: none;margin-bottom:12px;"/>' +
                        '<div style="text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal imageedit">' +
                    '<div style="max-width:526px;padding-top:7px;display:flex;flex-direction:column;align-items:center;">' +
                        '<div class="imageedit-crop" style="display:flex;height:80px;align-items:center;align-self:flex-start;">' +
                            '<button title="5x5" data-crop-size="1" style="width: 60px;height: 60px;">5x5</button>' +
                            '<button title="4x3" data-crop-size="1.33333" style="width: 60px;height: 45px;">4x3</button>' +
                            '<button title="3x4" data-crop-size="0.75" style="width: 45px;height: 60px;">3x4</button>' +
                            '<button title="6x4" data-crop-size="1.5" style="width: 60px;height: 40px;">6x4</button>' +
                            '<button title="4x6" data-crop-size="0.6666" style="width: 40px;height: 60px;">4x6</button>' +
                            '<button title="' + out('Free') + '" data-crop-size="" style="width: 60px;height: 45px;">' + out('Free') + '</button>' +
                        '</div>' +
                        '<div class="imageedit-preview" style="min-width:200px;">' +
                        '</div>' +
                        '<div style="margin-top:7px;text-align:right;align-self:flex-end;">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Apply') + '" class="input-ok classic-primary">' + out('Apply') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal imagelink">' +
                    '<div style="max-width:526px;">' +
                        '<div class="image-src">' +
                            '<input class="input-src" type="text" placeholder="' + out('Source') + '"/>' +
                            '<button title="' + out('Select') + '" class="input-select"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>' +
                        '</div>' +
                        '<input class="input-title" type="text" placeholder="Title" style="width:100%;border-top: none;"/>' +
                        '<div style="position:relative">' +
                            '<input class="input-link" type="text" placeholder="' + out('Link') + '" style="width:100%;border-top: none;"/>' +
                            '<div style="position:absolute;top:0;right:0;width:50px;height:50px;">' +
                                '<form id="form-upload-larger" target="frame-upload-larger" method="post" action="' + this.settings.largerImageHandler + '" enctype="multipart/form-data" style="position:absolute;top:0;left:0;width:100%;height:100%;">' +
				                    '<input id="hidRefId" name="hidRefId" type="hidden" value="" />' +
                                    '<iframe id="frame-upload-larger" name="frame-upload-larger" src="about:blank" style="width:1px;height:1px;position:absolute;top:0;right:-100000px"></iframe>' +
                                    '<svg class="is-icon-flex" style="position: absolute;top: 16px;left: 15px;width: 18px;height: 18px;fill:rgb(53, 53, 53);"><use xlink:href="#ion-image"></use></svg>' +
                                    '<input title="' + out('Select') + '" id="fileImage" name="fileImage" type="file" accept="image/*" style="position:absolute;top:-30px;left:0;width:100%;height:80px;opacity: 0;cursor: pointer;">' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                        '<label style="display:inline-block;margin-top:14px;margin-bottom:10px;">' +
                            '<input class="input-newwindow" type="checkbox" /> ' + out('Open New Window') + '&nbsp;' +
                        '</label>' +
                        '<div style="text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal edittable">' +
                    '<div style="max-width:252px;padding:0;box-sizing:border-box;position:relative;">' +
                        '<div class="is-modal-bar is-draggable">' + out('Table') + '</div>' +
                        '<div class="is-tabs clearfix" data-group="table">' +
                            '<a title="' + out('Style') + '" id="tabTableGeneral" href="" data-content="divTableGeneral" class="active">' + out('Style') + '</a>' +
                            '<a title="' + out('Layout') + '" id="tabTableLayout" href="" data-content="divTableLayout">' + out('Layout') + '</a>' +
                        '</div>' +
                        '<div id="divTableGeneral" class="is-tab-content" data-group="table" style="display:block">' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:115px;float:left;margin-bottom:0;">' +
                                '<div>' + out('Background') + ':</div>' +
                                '<div>' +
                                    '<input type="hidden" id="inpCellBgColor" value=""/>' +
                                    '<button title="' + out('Select Color') + '" class="input-table-bgcolor"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:90px;margin-bottom:0;">' +
                                '<div>' + out('Text Color') + ':</div>' +
                                '<div>' +
                                    '<input type="hidden" id="inpCellTextColor" value=""/>' +
                                    '<button title="' + out('Select Color') + '" class="input-table-textcolor"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>' + out('Border Thickness') + ':</div>' +
                                '<div>' +
                                    '<select id="selCellBorderWidth" style="width:120px;"><option value="0">No Border</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>' + out('Border Color') + ':</div>' +
                                '<div>' +
                                    '<input type="hidden" id="inpCellBorderColor" value=""/>' +
                                    '<button title="' + out('Select Color') + '" class="input-table-bordercolor"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>' + out('Apply To') + ':</div>' +
                                '<div>' +
                                    '<select id="selTableApplyTo" style="width:120px;">' +
                                        '<option value="table">' + out('Table') + '</option>' +
                                        '<option value="currentrow">' + out('Current Row') + '</option>' +
                                        '<option value="currentcol">' + out('Current Column') + '</option>' +
                                        '<option value="evenrows">' + out('Even Rows') + '</option>' +
                                        '<option value="oddrows">' + out('Odd Rows') + '</option>' +
                                        '<option value="currentcell">' + out('Current Cell') + '</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div id="divTableLayout" class="is-tab-content" data-group="table">' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>' + out('Insert Row') + ':</div>' +
                                '<div>' +
                                    '<button title="' + out('Above') + '" data-table-cmd="rowabove" title="Insert Row (Above)" style="width:100px;margin-right:5px"> ' + out('Above') + ' </button>' +
                                    '<button title="' + out('Below') + '" data-table-cmd="rowbelow" title="Insert Row (Below)" style="width:100px;"> ' + out('Below') + ' </button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>Insert Column:</div>' +
                                '<div>' +
                                    '<button title="' + out('Left') + '" data-table-cmd="columnleft" title="Insert Column (Left)" style="width:100px;margin-right:5px"> ' + out('Left') + ' </button>' +
                                    '<button title="' + out('Right') + '" data-table-cmd="columnright" title="Insert Column (Right)" style="width:100px;"> ' + out('Right') + ' </button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>Delete:</div>' +
                                '<div>' +
                                    '<button title="' + out('Row') + '" data-table-cmd="delrow" title="Delete Row" style="width:100px;margin-right:5px"> ' + out('Row') + ' </button>' +
                                    '<button title="' + out('Column') + '" data-table-cmd="delcolumn" title="Delete Column" style="width:100px;"> ' + out('Column') + ' </button>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="margin-bottom:0;">' +
                                '<div>' + out('Merge') + ':</div>' +
                                    '<button title="' + out('Merge Cell') + '" data-table-cmd="mergecell" title="Merge Cell" style="width:205px"> Merge Cell </button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                (bSideSnippets == true ? '' +
                '<div id="divSnippetList" class="is-modal is-side' + (this.settings.sidePanel == 'right' ? '' : ' fromleft') + ' snippetlist" style="width:315px">' +
                '</div>' : '') +
                '' +
                '<div class="is-modal is-side' + (this.settings.sidePanel == 'right' ? '' : ' fromleft') + ' elementstyles">' +
                    '<div class="elm-list" style="z-index:1;width:100%;height:100px;position:absolute;top:0px;left:0px;box-sizing:border-box;display:flex;align-items:center;flex-wrap: wrap;padding:10px 23px 10px 18px;border-bottom:#e8e8e8 1px solid;"></div>' +
                    '' +
                    '<div class="is-side-close" style="z-index:1;width:40px;height:40px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:40px;font-size: 12px;color:#777;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.47);width:40px;height:40px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div>' +
                    '' +
                    '<div style="position: absolute;bottom:7px;right:7px;width:40px;height:25px;z-index:1;display:flex">' +
                        '<button title="' + out('css') + '" class="elm-editstyle" style="width: 40px;height: 25px;font-family: sans-serif;font-size: 10px;padding: 0px;font-weight: bold;">css</button>' +
                    '</div>' +
                    '' +
                    '<div id="divEditStyle" style="background:#fff;width:320px;height:434px;margin:0px;position:absolute;top:30px;left:-350px;z-index:1;border:1px solid rgb(199, 199, 199);">' +
                        '<div class="is-modal-bar is-draggable" style="height:12px;"></div>' +
                        '<div style="padding:12px">' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>' + out('Style') + ':</div>' +
                                '<div>' +
                                    '<textarea id="inpElmInlineStyle" style="width:100%;height:256px;margin:0px;border:none;background:#f3f3f3;"></textarea>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>' + out('Class') + ':</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmClassName" value="" style="width:100%;padding-left: 16px;font-family: courier;font-size: 17px;line-height: 2;letter-spacing: 1px;border:none;background:#f3f3f3;"/>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '' +
                    '<div style="width:100%;height:100%;overflow-y:auto;overflow-x:hidden;position:absolute;top:0px;left:0px;box-sizing:border-box;border-top:100px solid transparent;padding:0px;">' +
                        '' +
                        '<div class="is-tabs clearfix" data-group="element" style="padding-right:0;padding-bottom:0;">' +
                            '<a title="' + out('Box') + '" id="tabElementBox" href="" data-content="divElementBox" class="active">' + out('Box') + '</a>' +
                            '<a title="' + out('Spacing') + '" id="tabElementSpacing" href="" data-content="divElementSpacing">' + out('Spacing') + '</a>' +
                            '<a title="' + out('Border') + '" id="tabElementBorder" href="" data-content="divElementBorder">' + out('Border') + '</a>' +
                            '<a title="' + out('Text') + '" id="tabElementType" href="" data-content="divElementType">' + out('Text') + '</a>' +
                            '<a title="' + out('More') + '" id="tabElementMore" href=""><svg class="is-icon-flex" style="width:15px;height:15px;"><use xlink:href="#ion-more"></use></svg></a>' +
                        '</div>' +
                        '' +
                        '<div id="divElementMore" style="top:50px;left:200px;" class="is-tabs-more" data-group="element">' +
                            '<a title="' + out('Corners') + '" id="tabElementCorners" href="" data-content="divElementCorners">' + out('Corners') + '</a>' +
                            '<a title="' + out('Shadow') + '" id="tabElementShadow" href="" data-content="divElementShadow">' + out('Shadow') + '</a>' +
                            '<a title="' + out('Display') + '" id="tabElementDisplay" href="" data-content="divElementDisplay">' + out('Display') + '</a>' +
                            '<a title="' + out('Position') + '" id="tabElementPosition" href="" data-content="divElementPosition">' + out('Position') + '</a>' +
                            '<a title="' + out('Effects') + '" id="tabElementEffects" href="" data-content="divElementEffects">' + out('Effects') + '</a>' +
                            '<a title="' + out('Attributes') + '" id="tabElementAttributes" href="" data-content="divElementAttributes">' + out('Attributes') + '</a>' +
                            (this.settings.elementAnimate==true ?'<a title="' + out('Animation') + '" id="tabElementAnimation" href="" data-content="divElementAnimation">' + out('Animation') + '</a>' : '') +
                        '</div>' +
                        '' +
                        '<div id="divElementBox" class="is-tab-content" data-group="element" style="display:block">' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>' + out('Background Color') + ':</div>' +
                                '<div>' +
                                    '<div class="input-elm-bgcolor" style="margin-top:10px;height:50px;"></div>' +
                                    '<button title="' + out('Gradient') + '" class="input-elm-gradient" data-value="+" style="width:135px;font-size: 14px;margin-top:10px;"> ' + out('Gradient') + ' </button>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">' + out('Dimension') + '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Width:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmWidth" value="" style="width:80px"/>' +
                                    '<select id="inpElmWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Height:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmHeight" value="" style="width:80px"/>' +
                                    '<select id="inpElmHeightUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Max Width:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmMaxWidth" value="" style="width:80px"/>' +
                                    '<select id="inpElmMaxWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Max Height:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmMaxHeight" value="" style="width:80px"/>' +
                                    '<select id="inpElmMaxHeightUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Min Width:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmMinWidth" value="" style="width:80px"/>' +
                                    '<select id="inpElmMinWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Min Height:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmMinHeight" value="" style="width:80px"/>' +
                                    '<select id="inpElmMinHeightUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Overflow x:</div>' +
                                '<div>' +
                                    '<select id="inpElmOverflowX" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="auto">Auto</option>' +
                                        '<option value="hidden">Hidden</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Overflow y:</div>' +
                                '<div>' +
                                    '<select id="inpElmOverflowY" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="auto">Auto</option>' +
                                        '<option value="hidden">Hidden</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementSpacing" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Padding</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Top:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmPaddingTop" value="" style="width:80px"/>' +
                                    '<select id="inpElmPaddingTopUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>Bottom:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmPaddingBottom" value="" style="width:80px"/>' +
                                    '<select id="inpElmPaddingBottomUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Left:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmPaddingLeft" value="" style="width:80px"/>' +
                                    '<select id="inpElmPaddingLeftUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>Right:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmPaddingRight" value="" style="width:80px"/>' +
                                    '<select id="inpElmPaddingRightUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">Margin</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Top:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmMarginTop" value="" style="width:65px"/>' +
                                    '<select id="inpElmMarginTopUnit" style="width:65px;height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                        '<option value="auto">auto</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>Bottom:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmMarginBottom" value="" style="width:65px"/>' +
                                    '<select id="inpElmMarginBottomUnit" style="width:65px;height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                        '<option value="auto">auto</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Left:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmMarginLeft" value="" style="width:65px"/>' +
                                    '<select id="inpElmMarginLeftUnit" style="width:65px;height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                        '<option value="auto">auto</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>Right:</div>' +
                                '<div style="display:flex;width:145px;float:left;">' +
                                    '<input type="text" id="inpElmMarginRight" value="" style="width:65px"/>' +
                                    '<select id="inpElmMarginRightUnit" style="width:65px;height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                        '<option value="auto">auto</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">' + out('Responsive Positioning') + ':</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div style="margin-top:15px">' +
                                    '<label for="chkResetMarginLeft"><input type="checkbox" id="chkResetMarginLeft" value="" /> ' + out('Reset margin left on small screen') + '</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div style="margin-top:0px">' +
                                    '<label for="chkResetMarginRight"><input type="checkbox" id="chkResetMarginRight" value="" /> ' + out('Reset margin right on small screen') + '</label>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementBorder" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Border</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div></div>' +
                                '<div style="display:flex;width:125px;float:left;">' +
                                    '<input type="text" id="inpElmBorderWidth" value="" style="width:50px"/>' +
                                    '<select id="inpElmBorderWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="none">none</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:90px;float:left;">' +
                                    '<select id="inpElmBorderStyle" style="width:80px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="solid">Solid</option>' +
                                        '<option value="dashed">Dashed</option>' +
                                        '<option value="dotted">Dotted</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:105px;float:left;">' +
                                    '<div class="input-elm-bordercolor" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">' + out('Individual Sides') + '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Border Top:</div>' +
                                '<div style="display:flex;width:125px;float:left;">' +
                                    '<input type="text" id="inpElmBorderTopWidth" value="" style="width:50px"/>' +
                                    '<select id="inpElmBorderTopWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="none">none</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:90px;float:left;">' +
                                    '<select id="inpElmBorderTopStyle" style="width:80px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="solid">Solid</option>' +
                                        '<option value="dashed">Dashed</option>' +
                                        '<option value="dotted">Dotted</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:105px;float:left;">' +
                                    '<div class="input-elm-bordertopcolor" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Border Bottom:</div>' +
                                '<div style="display:flex;width:125px;float:left;">' +
                                    '<input type="text" id="inpElmBorderBottomWidth" value="" style="width:50px"/>' +
                                    '<select id="inpElmBorderBottomWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="none">none</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:90px;float:left;">' +
                                    '<select id="inpElmBorderBottomStyle" style="width:80px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="solid">Solid</option>' +
                                        '<option value="dashed">Dashed</option>' +
                                        '<option value="dotted">Dotted</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:105px;float:left;">' +
                                    '<div class="input-elm-borderbottomcolor" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Border Left:</div>' +
                                '<div style="display:flex;width:125px;float:left;">' +
                                    '<input type="text" id="inpElmBorderLeftWidth" value="" style="width:50px"/>' +
                                    '<select id="inpElmBorderLeftWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="none">none</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:90px;float:left;">' +
                                    '<select id="inpElmBorderLeftStyle" style="width:80px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="solid">Solid</option>' +
                                        '<option value="dashed">Dashed</option>' +
                                        '<option value="dotted">Dotted</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:105px;float:left;">' +
                                    '<div class="input-elm-borderleftcolor" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Border Right:</div>' +
                                '<div style="display:flex;width:125px;float:left;">' +
                                    '<input type="text" id="inpElmBorderRightWidth" value="" style="width:50px"/>' +
                                    '<select id="inpElmBorderRightWidthUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="none">none</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:90px;float:left;">' +
                                    '<select id="inpElmBorderRightStyle" style="width:80px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="solid">Solid</option>' +
                                        '<option value="dashed">Dashed</option>' +
                                        '<option value="dotted">Dotted</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div style="width:105px;float:left;">' +
                                    '<div class="input-elm-borderrightcolor" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementType" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Text Color:</div>' +
                                '<div>' +
                                    '<div class="input-elm-color" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Font Size:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmFontSize" value="" style="width:80px"/>' +
                                    '<select id="inpElmFontSizeUnit" style="width:50px;height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="pt">pt</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Text Align:</div>' +
                                '<div>' +
                                    '<select id="inpElmTextAlign" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="left">Left</option>' +
                                        '<option value="center">Center</option>' +
                                        '<option value="right">Right</option>' +
                                        '<option value="justify">Full</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Line Height:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmLineHeight" value="" style="width:80px"/>' +
                                    '<select id="inpElmLineHeightUnit" style="width:50px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="px">px</option>' +
                                        '<option value="pt">pt</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Font Weight:</div>' +
                                '<div>' +
                                    '<select id="inpElmFontWeight" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="100">100</option>' +
                                        '<option value="200">200</option>' +
                                        '<option value="300">300</option>' +
                                        '<option value="400">400</option>' +
                                        '<option value="500">500</option>' +
                                        '<option value="600">600</option>' +
                                        '<option value="700">700</option>' +
                                        '<option value="800">800</option>' +
                                        '<option value="900">900</option>' +
                                        '<option value="bold">Bold</option>' +
                                        '<option value="normal">Normal</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Font Style:</div>' +
                                '<div>' +
                                    '<select id="inpElmFontStyle" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="italic">Italic</option>' +
                                        '<option value="normal">Normal</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Text Transform:</div>' +
                                '<div>' +
                                    '<select id="inpElmTextTransform" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="uppercase">Uppercase</option>' +
                                        '<option value="lowercase">Lowercase</option>' +
                                        '<option value="capitalize">Capitalize</option>' +
                                        '<option value="none">None</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Text Decoration:</div>' +
                                '<div>' +
                                    '<select id="inpElmTextDecoration" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="underline">Underline</option>' +
                                        '<option value="line-through">Line Through</option>' +
                                        '<option value="overline">Overline</option>' +
                                        '<option value="none">None</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Letter Spacing:</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmLetterSpacing" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Word Spacing:</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmWordSpacing" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Font Family:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmFontFamily" value="" style="width:100%"/>' +
                                    '<button title="' + out('Select Font') + '" class="input-elm-fontfamily" style="border-left: none;width:60px;height:50px;"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementCorners" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Corners</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:9px;">' +
                                '<div>Border Radius:</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmBorderRadius" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">Individual Corners</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Top Left</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmBorderTopLeftRadius" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>Top Right</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmBorderTopRightRadius" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Bottom Left</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmBorderBottomLeftRadius" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>Bottom Right</div>' +
                                '<div>' +
                                    '<input type="text" id="inpElmBorderBottomRightRadius" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementShadow" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Shadow</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>x Offset:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmBoxShadowX" value="" style="width:80px"/>' +
                                    '<select id="inpElmBoxShadowXUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>y Offset:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmBoxShadowY" value="" style="width:80px"/>' +
                                    '<select id="inpElmBoxShadowYUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Blur:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmBoxShadowBlur" value="" style="width:80px"/>' +
                                    '<select id="inpElmBoxShadowBlurUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Spread:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmBoxShadowSpread" value="" style="width:80px"/>' +
                                    '<select id="inpElmBoxShadowSpreadUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Shadow Color:</div>' +
                                '<div>' +
                                    '<div class="input-elm-shadowcolor" style="height:50px;"></div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Outer/Inner Shadow:</div>' +
                                '<div>' +
                                    '<select id="inpElmBoxShadowInset" style="height:50px;border-radius:0;">' +
                                        '<option value="">Outset</option>' +
                                        '<option value="inset">Inset</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '' +
                        '<div id="divElementDisplay" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Display</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmDisplay" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="block">Block</option>' +
                                        '<option value="inline-block">Inline Block</option>' +
                                        '<option value="inline">Inline</option>' +
                                        '<option value="flex">Flex</option>' +
                                        '<option value="none">None</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;width:100%;">Flex</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Flex Direction:</div>' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmFlexDirection" style="width:120px;height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="row">Row</option>' +
                                        '<option value="row-reverse">Row Reverse</option>' +
                                        '<option value="column">Column</option>' +
                                        '<option value="column-reverse">Column Reverse</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Flex Wrap:</div>' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmFlexWrap" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="no-wrap">No Wrap</option>' +
                                        '<option value="wrap">Wrap</option>' +
                                        '<option value="wrap-reverse">Wrap Reverse</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Justify Content:</div>' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmJustifyContent" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="center">Center</option>' +
                                        '<option value="flex-start">Flex Start</option>' +
                                        '<option value="flex-end">Flex End</option>' +
                                        '<option value="space-around">Space Around</option>' +
                                        '<option value="space-between">Space Between</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Align Items:</div>' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmAlignItems" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="center">Center</option>' +
                                        '<option value="flex-start">Flex Start</option>' +
                                        '<option value="flex-end">Flex End</option>' +
                                        '<option value="stretch">Stretch</option>' +
                                        '<option value="baseline">Baseline</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Align Content:</div>' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmAlignContent" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="center">Center</option>' +
                                        '<option value="flex-start">Flex Start</option>' +
                                        '<option value="flex-end">Flex End</option>' +
                                        '<option value="stretch">Stretch</option>' +
                                        '<option value="space-around">Space Around</option>' +
                                        '<option value="space-between">Space Between</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementPosition" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Position</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmPosition" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="relative">Relative</option>' +
                                        '<option value="absolute">Absolute</option>' +
                                        '<option value="fixed">Fixed</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Top:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmTop" value="" style="width:80px"/>' +
                                    '<select id="inpElmTopUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Left:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmLeft" value="" style="width:80px"/>' +
                                    '<select id="inpElmLeftUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;float:left;margin-bottom:0;">' +
                                '<div>Bottom:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmBottom" value="" style="width:80px"/>' +
                                    '<select id="inpElmBottomUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:145px;margin-bottom:0;">' +
                                '<div>Right:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmRight" value="" style="width:80px"/>' +
                                    '<select id="inpElmRightUnit" style="height:50px;border-radius:0;">' +
                                        '<option value="px">px</option>' +
                                        '<option value="em">em</option>' +
                                        '<option value="vw">vw</option>' +
                                        '<option value="vh">vh</option>' +
                                        '<option value="%">%</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">Float</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<select id="inpElmFloat" style="height:50px;border-radius:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="left">Left</option>' +
                                        '<option value="right">Right</option>' +
                                        '<option value="none">None</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementEffects" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Effects</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div>Opacity:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmOpacity" value="" style="width:100px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div style="margin-top: 25px;font-weight: bold;line-height: 1.7;">Filters</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Blur:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmBlur" value="" style="width:80px"/> px' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Brightness:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmBrightness" value="" style="width:80px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Contrast:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmContrast" value="" style="width:80px"/> %' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Grayscale:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmGrayscale" value="" style="width:80px"/> %' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Hue Rotate:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmHueRotate" value="" style="width:80px"/> <span style="font-size:14px">deg</span>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Invert:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmInvert" value="" style="width:80px"/> %' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Saturate:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmSaturate" value="" style="width:80px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:120px;float:left;margin-bottom:0;">' +
                                '<div>Sepia:</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<input type="text" id="inpElmSepia" value="" style="width:80px"/> %' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementAttributes" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">Attributes</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div>Attribute Names:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttr1" value="" style="width:120px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:180px;float:left;margin-bottom:0;">' +
                                '<div>Attribute Values:</div>' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttrVal1" value="" style="width:160px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttr2" value="" style="width:120px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:180px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttrVal2" value="" style="width:160px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttr3" value="" style="width:120px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:180px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttrVal3" value="" style="width:160px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttr4" value="" style="width:120px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:180px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttrVal4" value="" style="width:160px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttr5" value="" style="width:120px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:180px;float:left;">' +
                                '<div style="display:flex">' +
                                    '<input type="text" id="inpElmAttrVal5" value="" style="width:160px"/>' +
                                '</div>' +
                            '</div>' +
                            '' +
                        '</div>' +
                        '' +
                        '<div id="divElementAnimation" class="is-tab-content" data-group="element">' +
                            '' +
                            '<div style="margin-top: 13px;font-weight: bold;line-height: 1.7;">' + out('Animate') + '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<select id="selElmAnim" style="height:45px;margin-bottom:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="fade">fade</option>' +
                                        '<option value="fade-up">fade-up</option>' +
                                        '<option value="fade-down">fade-down</option>' +
                                        '<option value="fade-left">fade-left</option>' +
                                        '<option value="fade-right">fade-right</option>' +
                                        '<option value="fade-up-right">fade-up-right</option>' +
                                        '<option value="fade-up-left">fade-up-left</option>' +
                                        '<option value="fade-down-right">fade-down-right</option>' +
                                        '<option value="fade-down-left">fade-down-left</option>' +
                                        '<option value="flip-up">flip-up</option>' +
                                        '<option value="flip-down">flip-down</option>' +
                                        '<option value="flip-left">flip-left</option>' +
                                        '<option value="flip-right">flip-right</option>' +
                                        '<option value="slide-up">slide-up</option>' +
                                        '<option value="slide-down">slide-down</option>' +
                                        '<option value="slide-left">slide-left</option>' +
                                        '<option value="slide-right">slide-right</option>' +
                                        '<option value="zoom-in">zoom-in</option>' +
                                        '<option value="zoom-in-up">zoom-in-up</option>' +
                                        '<option value="zoom-in-down">zoom-in-down</option>' +
                                        '<option value="zoom-in-left">zoom-in-left</option>' +
                                        '<option value="zoom-in-right">zoom-in-right</option>' +
                                        '<option value="zoom-out">zoom-out</option>' +
                                        '<option value="zoom-out-up">zoom-out-up</option>' +
                                        '<option value="zoom-out-down">zoom-out-down</option>' +
                                        '<option value="zoom-out-left">zoom-out-left</option>' +
                                        '<option value="zoom-out-right">zoom-out-right</option>' +
                                    '</select>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>' + out('Delay') + ':</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<select id="selElmAnimDelay" style="height:45px;margin-bottom:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="0">0</option>' +
                                        '<option value="100">100</option>' +
                                        '<option value="200">200</option>' +
                                        '<option value="300">300</option>' +
                                        '<option value="400">400</option>' +
                                        '<option value="500">500</option>' +
                                        '<option value="600">600</option>' +
                                        '<option value="700">700</option>' +
                                        '<option value="800">800</option>' +
                                        '<option value="900">900</option>' +
                                        '<option value="1000">1000</option>' +
                                        '<option value="1100">1100</option>' +
                                        '<option value="1200">1200</option>' +
                                        '<option value="1300">1300</option>' +
                                        '<option value="1400">1400</option>' +
                                        '<option value="1500">1500</option>' +
                                        '<option value="1600">1600</option>' +
                                        '<option value="1700">1700</option>' +
                                        '<option value="1800">1800</option>' +
                                        '<option value="1900">1900</option>' +
                                        '<option value="2000">2000</option>' +
                                        '<option value="2100">2100</option>' +
                                        '<option value="2200">2200</option>' +
                                        '<option value="2300">2300</option>' +
                                        '<option value="2400">2400</option>' +
                                        '<option value="2500">2500</option>' +
                                        '<option value="2600">2600</option>' +
                                        '<option value="2700">2700</option>' +
                                        '<option value="2800">2800</option>' +
                                        '<option value="2900">2900</option>' +
                                        '<option value="3000">3000</option>' +
                                    '</select> ms' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:140px;margin-bottom:0;">' +
                                '<div>' + out('Duration') + ':</div>' +
                                '<div style="width:115px;float:left;">' +
                                    '<select id="selElmAnimDuration" style="height:45px;margin-bottom:0;">' +
                                        '<option value=""></option>' +
                                        '<option value="0">0</option>' +
                                        '<option value="100">100</option>' +
                                        '<option value="200">200</option>' +
                                        '<option value="300">300</option>' +
                                        '<option value="400">400</option>' +
                                        '<option value="500">500</option>' +
                                        '<option value="600">600</option>' +
                                        '<option value="700">700</option>' +
                                        '<option value="800">800</option>' +
                                        '<option value="900">900</option>' +
                                        '<option value="1000">1000</option>' +
                                        '<option value="1100">1100</option>' +
                                        '<option value="1200">1200</option>' +
                                        '<option value="1300">1300</option>' +
                                        '<option value="1400">1400</option>' +
                                        '<option value="1500">1500</option>' +
                                        '<option value="1600">1600</option>' +
                                        '<option value="1700">1700</option>' +
                                        '<option value="1800">1800</option>' +
                                        '<option value="1900">1900</option>' +
                                        '<option value="2000">2000</option>' +
                                        '<option value="2100">2100</option>' +
                                        '<option value="2200">2200</option>' +
                                        '<option value="2300">2300</option>' +
                                        '<option value="2400">2400</option>' +
                                        '<option value="2500">2500</option>' +
                                        '<option value="2600">2600</option>' +
                                        '<option value="2700">2700</option>' +
                                        '<option value="2800">2800</option>' +
                                        '<option value="2900">2900</option>' +
                                        '<option value="3000">3000</option>' +
                                    '</select> ms' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;margin-bottom:0;">' +
                                '<div style="margin-top:15px">' +
                                    '<label for="chkAnimateOnce"><input type="checkbox" id="chkAnimateOnce" value="" /> ' + out('Animate Once') + '</label>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div class="is-settings clearfix" style="display:inline-block;width:100%;float:left;margin-bottom:0;">' +
                                '<div style="display:flex">' +
                                    '<button title="' + out('Test') + '" id="btnPreviewAnim" class="classic" value="" style="width:100%;height:45px;">' + out('TEST') + '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal pickfontfamily">' +
                    '<div style="max-width:303px;padding:0;box-sizing:border-box;position:relative;">' +
                        '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;">' + out('Font') + '</div>' +
                        '<div class="clearfix" style="margin-top:40px;padding:0px;height:300px;position:relative;">' +
                            '<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;border: none;"></iframe>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal pickgradientcolor">' +
                    '<div style="max-width:293px;padding:0;box-sizing:border-box;position:relative;">' +
                        '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;">' + out('Gradient') + '</div>' +
                        '<div class="clearfix" style="margin-top:40px;padding: 20px;">' +
                            '<div style="display: flex;flex-flow: wrap;">'+
                                '[GRADIENTCOLORS]' +
                                '<button title="' + out('Clear') + '" id="inpElmGradClear" data-value="" style="width:50px;border: 1px solid rgb(229, 229, 229);border-left: none;border-top: none;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                            '</div>' +
                            '<div class="is-settings" style="margin-bottom:0">' +
                                '<div>' + out('Custom') + ':</div>' +
                                '<div>' +
                                    '<div id="divCustomElmGradColors" class="clearfix" style="margin-bottom:10px;"></div>' +
                                    '<input type="hidden" id="inpElmGrad1" value="">'+
                                    '<button title="' + out('Select Color') + '" class="cmd-elm-pickgradient1" data-value="dark" style="width:55px;height:50px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>' +
                                    '<input type="hidden" id="inpElmGrad2" value="">'+
                                    '<button title="' + out('Select Color') + '" class="cmd-elm-pickgradient2" data-value="dark" style="width:55px;height:50px;border-left:none;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>' +
                                    '<div style="width:100px;float:left;margin-left:10px;">' +
                                        '<input type="text" id="inpElmGradDeg" value="0" style="width:60px;margin-right:3px;"/> deg' +
                                    '</div>' +
                                    '<br style="clear:both">' +
                                    '<button title="' + out('Add') + '" class="cmd-elm-savegrad" style="width:100%;font-size: 14px;margin-top:10px;"> ' + out('Add') + ' </button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal pickcolor" style="background: rgba(255,255,255,0.001);">' +
                    '<div style="max-width:341px;">' +
                        '<div class="is-modal-bar is-draggable" style="margin-top:-12px;height:12px;"></div>' +
                        '[COLORS]' +
                        '<br style="clear:both">' +
                        '<div class="clearfix" style="width:315px;height:45px;overflow:hidden;position:relative;">' +
                            '<div class="gradient" style="width:630px;height:45px;;position:absolute;top:0;transition: all ease 0.3s;">[GRADIENT]</div>' +
                        '</div>' +
                        '<button data-color="#ffffff" style="background:#ffffff;border:#e7e7e7 1px solid;width:90px"><span style="position:absolute;top:0;left:0;width:100%;height:100%;border:#f8f8f8 1px solid;box-sizing: border-box;line-height:41px;font-size:10px;">White</span></button>' +
                        '<button title="' + out('Clear') + '" data-color="" class="clear classic" style="">' + out('Clear') + '</button>' +
                        '<button title="' + out('More') + '" class="input-more classic" style="font-size:20px;color:#777;"><svg class="is-icon-flex" style="width:13px;height:13px;transform: rotateZ(90deg);"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                        '<div class="more clearfix" style="display:flex">' +
                            '<button class="is-color-preview" style="width:45px;height:45px;border:1px solid rgba(53, 53, 53, 0.28);border-right:none;box-sizing:border-box;margin-top:8px;"></button>' +
                            '<input class="input-text" type="text" style="width:225px;margin-top:8px;"/>' +
                            '<button title="' + out('Apply') + '" class="input-ok" style="border: 1px solid rgb(199, 199, 199);border-left:none;margin-top:8px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);"><use xlink:href="#icon-ok"></use></svg></use></svg></svg></button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal iframelink">' +
                    '<div style="max-width:550px;">' +
                        '<input class="input-src" type="text" placeholder="Source" style="width:100%;margin-bottom:12px;"/>' +
                        '<textarea class="input-embedcode" type="text" placeholder="Embed Code" style="width:100%;height:300px;margin-bottom:12px;display:none;"></textarea>' +
                        '<div style="text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal customcode">' +
                    '<div style="max-width:900px;height:570px;padding:0;box-sizing:border-box;position:relative;">' +
                        '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;">' + out('Custom Code (Javascript Allowed)') + '</div>' +
                        '<textarea class="input-customcode" type="text" style="background: #fff;position: absolute;top: 0;left: 0;width:100%;height:100%;border:none;border-bottom:60px solid transparent;border-top:40px solid transparent;box-sizing:border-box;"></textarea>' +
                        '<input id="hidContentModuleCode" type="hidden" />' +
                        '<input id="hidContentModuleSettings" type="hidden" />' +
                        '<button title="' + out('Enlarge') + '" class="cell-html-larger" style="width:35px;height:35px;position:absolute;right:0;top:0;background:transparent;z-index:2;"><svg class="is-icon-flex" style="width:19px;height:19px;fill:rgb(170, 170, 170);"><use xlink:href="#ion-arrow-expand"></use></svg></button>' +
                        '<div style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal custommodule">' +
                    '<div style="max-width:900px;height:570px;padding:0;box-sizing:border-box;position:relative;">' +
                        '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;">' + out('Module Settings') + '</div>' +
                        '<iframe style="position: absolute;top: 0;left: 0;width:100%;height:100%;border:none;border-bottom:60px solid transparent;border-top:40px solid transparent;margin:0;box-sizing:border-box;" src="about:blank"></iframe>' +
                        '<div style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal insertimage">' +
                    '<div style="max-width:560px;">' +
                        '<div class="is-browse-area">' +
                            '<div class="is-drop-area">' +
                                '<input id="fileInsertImage" type="file" accept="image/*" />' +
                                '<div class="drag-text">' +
                                    '<p style="display:flex;justify-content:center;align-items:center;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:20px;height:20px;"><use xlink:href="#ion-camera"></use></svg> <span style="margin-left:5px;margin-top:3px;">' + out('Drag and drop an image or click to browse.') + '</span></p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="is-preview-area">' +
                                '<div><img id="imgInsertImagePreview" alt="" /><i class="ion-ios-close-empty"></i></div>' +
                            '</div>' +
                        '</div>' +
                        '<p>' + out('Or Specify Image Source') + ':</p>' +
                        ((plugin.settings.onImageSelectClick+'').replace( /\s/g, '') != 'function(){}' || plugin.settings.imageselect!='' ? '<div class="image-src clearfix" style="margin-bottom: 12px;"><input class="input-src" type="text" placeholder="' + out('Source') + '"><button title="' + out('Select') + '" class="input-select"><svg class="is-icon-flex"><use xlink:href="#ion-more"></use></svg></button></div>' : '<div class="image-src clearfix" style="margin-bottom: 12px;"><input class="input-src" type="text" placeholder="' + out('Source') + '"></div>') +
                        '<div style="text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal is-side' + (this.settings.sidePanel == 'right' ? '' : ' fromleft') + ' viewicons" style="width:320px;">' +
                    '<div class="is-side-close" style="z-index:1;width:40px;height:40px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:40px;font-size: 12px;color:#777;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.47);width:40px;height:40px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div>' +
                    '' +
                    '<iframe id="ifrIconInsert" style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>' +
                    '<iframe id="ifrIconEdit" style="width:100%;height:100%;border: none;display: none;" src="about:blank"></iframe>' +
                    '' +
                '</div>' +
                '' +
                '<div class="is-modal is-side' + (this.settings.sidePanel == 'right' ? '' : ' fromleft') + ' viewsizes" style="width:338px;">' +
                    '<div class="is-side-close" style="z-index:1;width:40px;height:40px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:40px;font-size: 12px;color:#777;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.47);width:40px;height:40px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div>' +
                    '' +
                    '<iframe id="ifrApplySize" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>' +
                    '' +
                '</div>' +
                '' +
                '<div class="is-modal grideditor" style="' + (plugin.settings.emailMode ? 'height:200px;' : '' ) + 'z-index:10002">' +
                    '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:1.5;height:20px;border:none;">' +
                        '<div class="is-modal-close" style="z-index:1;width:20px;height:20px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:20px;font-size:10px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>' +
                    '</div>' +
                    '' +
                    '<div style="padding:30px 0 5px 18px;font-size:11px;color:#333;text-transform:uppercase;letter-spacing:1px;">Row' +
                    '</div>' +
                    '<div style="display:flex;flex-flow:wrap;">' +
                        '<button title="' + out('Add') + '" class="row-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                        '<button title="' + out('Duplicate') + '" class="row-duplicate" style="display: block;"><svg class="is-icon-flex"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                        '<button title="' + out('Move Up') + '" class="row-up" style="display: block;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:18px;height:18px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>' +
                        '<button title="' + out('Move Down') + '" class="row-down" style="display: block;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:18px;height:18px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>' +
                        '<button title="' + out('HTML') + '" class="row-html"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                        '<button title="' + out('Delete') + '" class="row-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                    '</div>' +
                    (plugin.settings.emailMode ? '' : '<div style="padding:8px 0 5px 18px;font-size:11px;color:#333;text-transform:uppercase;letter-spacing:1px;">Column' +
                    '</div>' +
                    '<div style="display:flex;flex-flow:wrap;">' +
                        '<button title="' + out('Add') + '" class="cell-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:21px;height:21px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                        '<button title="' + out('Duplicate') + '" class="cell-duplicate"><svg class="is-icon-flex"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                        '<button title="' + out('Move Up') + '" class="cell-up"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>' +
                        '<button title="' + out('Move Down') + '" class="cell-down"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>' +
                        '<button title="' + out('Move Left') + '" class="cell-prev"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-left"></use></svg></button>' +
                        '<button title="' + out('Move Right') + '" class="cell-next"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-right"></use></svg></button>' +
                        '<button title="' + out('Increase') + '" class="cell-increase"><svg class="is-icon-flex"><use xlink:href="#icon-increase"></use></svg></button>' +
                        '<button title="' + out('Decrease') + '" class="cell-decrease"><svg class="is-icon-flex"><use xlink:href="#icon-decrease"></use></svg></button>' +
                        '<button title="' + out('HTML') + '" class="cell-html"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                        '<button title="' + out('Delete') + '" class="cell-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                        '<div style="width:100%;border-top:#ececec 1px solid;display:flex">' +
                            '<button title="' + out('Outline') + '" class="cell-outline"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:14px;height:14px;"><use xlink:href="#ion-ios-grid-view-outline"></use></svg></button>' +
                            '<button title="' + out('Element Tool') + '" class="cell-elmtool"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:12px;height:12px;"><use xlink:href="#ion-ios-gear"></use></svg></button>' +
                        '</div>' +
                    '</div>') +
                    /*'<div style="padding:8px 0 5px 18px;font-size:11px;color:#333;text-transform:uppercase;letter-spacing:1px;">Element' +
                    '</div>' +
                    '<div style="display:flex;flex-flow:wrap;">' +
                        '<button title="' + out('Add') + '" class="element-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:21px;height:21px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                        '<button title="' + out('Duplicate') + '" class="element-duplicate"><svg class="is-icon-flex"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                        '<button title="' + out('Move Up') + '" class="element-up"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.9);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>' +
                        '<button title="' + out('Move Down') + '" class="element-down"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.9);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>' +
                        '<button title="' + out('Settings') + '" class="element-edit"><svg class="is-icon-flex" style="width:15px;height:15px;fill: rgba(0, 0, 0, 0.6);"><use xlink:href="#ion-ios-gear"></use></svg></button>' +
                        '<button title="' + out('Delete') + '" class="element-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button>' +
                    '</div>' +*/
                    '' +
                '</div>' +
                '' +
                '<div class="is-modal viewconfig">' +
                    '<div style="width:100%;max-width:700px;padding:5px 12px 12px 20px">' +
                        '<div style="font-weight:600;text-align:center;">' + out('Preferences') + '</div>' +
                        '<div style="display:flex;flex-wrap:wrap;width:100%;">' +
                            '<div>' +
                                '<label style="display:block;margin-top:14px;margin-bottom:5px;">' +
                                    out('Builder Mode') + ':&nbsp;' +
                                    '<select class="select-buildermode">' +
                                        '<option value="">' + out('Default') + '</option>' +
                                        '<option value="minimal">' + out('Minimal') + '</option>' +
                                        '<option value="clean">' + out('Clean') + '</option>' +
                                    '</select>' +
                                '</label>' +
                                '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hiderowcoloutline" type="checkbox" /> ' + out('Hide outline') + '&nbsp;' +
                                '</label>' +
                                (!plugin.settings.emailMode ? '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hidecelltool" type="checkbox" /> ' + out('Hide column tool') + '&nbsp;' +
                                '</label>': '') +
                                (!plugin.settings.emailMode ? '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hidecolhtmleditor" type="checkbox" /> ' + out('Hide column HTML editor') + '&nbsp;' +
                                '</label>': '') +
                                '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hiderowhtmleditor" type="checkbox" /> ' + out('Hide row HTML editor') + '&nbsp;' +
                                '</label>' +
                                (bSideSnippets ? '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hiderowmovebuttons" type="checkbox" /> ' + out('Hide row move (up/down) buttons') + '&nbsp;' +
                                '</label>': '') +
                                /*'<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hiderowtool" type="checkbox" /> ' + out('Hide row tool') + '&nbsp;' +
                                '</label>' + */
                                '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hideelementtool" type="checkbox" /> ' + out('Hide element tool') + '&nbsp;' +
                                '</label>' +
                                '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-hideelementhighlight" type="checkbox" /> ' + out('Hide element highlight') + '&nbsp;' +
                                '</label>' +
                                '<label style="display:block;margin-top:5px;margin-bottom:5px;">' +
                                    out('Row tool position') + ':&nbsp;' +
                                    '<select class="select-rowtool">' +
                                        '<option value="right">' + out('Right') + '</option>' +
                                        '<option value="left">' + out('Left') + '</option>' +
                                    '</select>' +
                                '</label>' +
                                '<label style="display:block;margin-top:5px;margin-bottom:5px;">' +
                                    out('Add (+) button placement') + ':&nbsp;' +
                                    '<select class="select-addbuttonplace" style="margin-top:5px">' +
                                        '<option value="">' + out('Default') + '</option>' +
                                        '<option value="between-blocks-left">' + out('Between Blocks (left)') + '</option>' +
                                        '<option value="between-blocks-center">' + out('Between Blocks (center)') + '</option>' +
                                    '</select>' +
                                '</label>' +
                            '</div>' +
                            '<div style="padding-top: 0px;">' +
                                (!plugin.settings.emailMode ? '<label style="display:block;margin-top:14px;margin-bottom:5px;">' +
                                    out('Outline Mode') + ':&nbsp;' +
                                    '<select class="select-outlinemode">' +
                                        '<option value="">' + out('Row & column') + '</option>' +
                                        '<option value="row">' + out('Row only') + '</option>' +
                                    '</select>' +
                                '</label>': '<div style="height:60px"></div>') +
                                (typeof jQuery.ui !== 'undefined' ? '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-dragwithouthandle" type="checkbox" /> ' + out('Draggable blocks without handle') + '&nbsp;' +
                                '</label>' +
                                '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-animatedsorting" type="checkbox" /> ' + out('Animated drag to sort') + '&nbsp;' +
                                '</label>'
                                : '') +
                                (bSideSnippets && plugin.settings.snippetList=='#divSnippetList' ? '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-opensnippets" type="checkbox" /> ' + out('Open snippets sidebar on start') + '&nbsp;' +
                                '</label>': '') +
                                '<label style="display:block;margin-top:14px;margin-bottom:10px;">' +
                                    '<input class="input-advancedhtmleditor" type="checkbox" /> ' + out('HTML syntax highlighting') + '&nbsp;' +
                                '</label>' +
                                '<label style="display:block;margin-top:14px;margin-bottom:5px;">' +
                                    out('Toolbar visibility') + ':&nbsp;' +
                                    '<select class="select-editingtoolbardisplay">' +
                                        '<option value="auto">' + out('Auto') + '</option>' +
                                        '<option value="always">' + out('Always Visible') + '</option>' +
                                    '</select>' +
                                '</label>' +
                                '<label style="' + (bIsAppleMobile ? 'display:none;' : 'display:block;') + 'margin-top:5px;margin-bottom:5px;">' +
                                    out('Toolbar position') + ':&nbsp;' +
                                    '<select class="select-editingtoolbar">' +
                                        '<option value="top">' + out('Top') + '</option>' +
                                        '<option value="left">' + out('Left') + '</option>' +
                                        '<option value="right">' + out('Right') + '</option>' +
                                    '</select>' +
                                '</label>' +
                                '<label style="' + (bIsAppleMobile ? 'display:none;' : 'display:block;') + 'margin-top:5px;margin-bottom:10px;">' +
                                    '<input class="input-scrollableeditor" type="checkbox" /> ' + out('Scrollable toolbar (top only)') + '&nbsp;' +
                                '</label>' +
                                '<label style="display:block;margin-top:5px;margin-bottom:5px;">' +
                                    out('Paste result') + ':&nbsp;' +
                                    '<select class="select-pasteresult">' +
                                        '<option value="html-without-styles">' + out('HTML (without styles)') + '</option>' +
                                        '<option value="html">' + out('HTML (with styles)') + '</option>' +
                                        '<option value="text">' + out('Text only') + '</option>' +
                                    '</select>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div style="text-align:right;margin-top:30px">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal viewhtml">' +
                    '<div style="width:80%;max-width:1200px;height:80%;padding:0;box-sizing:border-box;position:relative;">' +
                        '<textarea class="tabSupport" style="width:100%;height:100%;border:none;border-bottom:60px solid transparent;margin:0;box-sizing:border-box;"></textarea>' +
                        '<button title="' + out('Enlarge') + '" class="cell-html-larger" style="width:35px;height:35px;position:absolute;right:20px;top:0;background:#fff;"><svg class="is-icon-flex" style="width:19px;height:19px;fill:rgb(170, 170, 170);"><use xlink:href="#ion-arrow-expand"></use></svg></button>' +
                        '<div style="width:100%;height:50px;position:absolute;left:0;bottom:0;border-top: #efefef 1px solid;overflow:hidden;text-align:right">' +
                            '<button title="' + out('Cancel') + '" class="cell-html-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="cell-html-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal viewhtmlformatted">' +
                    '<div style="width:80%;max-width:1200px;height:80%;padding:0;box-sizing:border-box;position:relative;">' +
                        '<iframe id="ifrHtmlFormatted" style="width:100%;height:100%;border:none;margin:0;box-sizing:border-box;" src="about:blank"></iframe>' +
                        '<textarea style="position:absolute;display:none;"></textarea>' +
                        '<button title="' + out('Enlarge') + '" class="cell-html-larger" style="width:35px;height:35px;position:absolute;right:20px;top:0;background:#fff;"><svg class="is-icon-flex" style="width:19px;height:19px;fill:rgb(170, 170, 170);"><use xlink:href="#ion-arrow-expand"></use></svg></button>' +
                        '<div style="display:none">' +
                            '<button title="' + out('Cancel') + '" class="input-cancel classic-secondary">' + out('Cancel') + '</button>' +
                            '<button title="' + out('Ok') + '" class="input-ok classic-primary">' + out('Ok') + '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal viewhtmllarger" style="align-items:flex-end;">' +
                    '<div style="width:100%;height:100%;border:none;padding:0;">' +
                        '<iframe id="ifrHtml" style="width:100%;height:100%;border: none;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal snippets">' +
                    '<div style="max-width:1250px;height:90%;padding:0;">' +
                    '<iframe style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal delconfirm">' +
                    '<div style="max-width:526px;text-align:center;">' +
                        '<p>' + out('Are you sure you want to delete this block?') + '</p>' +
                        '<button title="' + out('Delete') + '" class="input-ok classic">' + out('Delete') + '</button>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-tool mobile-tool">' +
                    '<button title="' + out('Back') + '" class="mobile-close"><svg class="is-icon-flex" style="fill: rgb(53, 53, 53);width:20px;height:20px;"><use xlink:href="#ion-ios-redo"></use></svg></button>' +
                '</div>' +
                '' +
                '<div class="is-modal fileselect">' +
                    '<div style="max-width:800px;height:80%;padding:0;">' +
                        '<iframe style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div class="is-modal imageselect">' +
                    '<div style="max-width:800px;height:80%;padding:0;">' +
                        '<iframe style="width:100%;height:100%;border: none;display: block;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>' +
                '' +
                '<div id="divTemporaryContent" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>' +
                '' +
                '<div id="divImgResizer" style="display:none;background:transparent;position:absolute;box-sizing:border-box;z-index:1">' +
                    '<div class="ui-resizable-handle ui-resizable-ne"></div>' +
                    '<div class="ui-resizable-handle ui-resizable-se"></div>' +
                    '<div class="ui-resizable-handle ui-resizable-sw"></div>' +
                    '<div class="ui-resizable-handle ui-resizable-nw"></div>' +
                '</div>' +
                '' +
                '<div id="divSnippetDragHelper" style="display:none;background:red;position:absolute;box-sizing:border-box;z-index:100000">' +
                '</div>' +
                '';

                //colors
                var html_colors = '';
                for (var i = 0; i < this.settings.colors.length; i++) {
                    if (this.settings.colors[i] == '#ececec') {
                        html_colors += '<button data-color="' + this.settings.colors[i] + '" style="background:' + this.settings.colors[i] + ';border:#e7e7e7 1px solid"></button>';
                    } else {
                        html_colors += '<button data-color="' + this.settings.colors[i] + '" style="background:' + this.settings.colors[i] + ';border:' + this.settings.colors[i] + ' 1px solid"></button>';
                    }
                }
                html = html.replace(/\[COLORS\]/g, html_colors);

                html_colors = '';
                for (i = 0; i <= 13; i++) { //previously 0-6 (7 options)
                    var percent = (i - 2) * 30; //Make percentage darken/lighten color from -40 to 100
                    var color = plugin.LightenDarkenColor('#777777', percent);
                    html_colors += '<button data-color="' + color + '" style="background:' + color + ';border:' + color + ' 1px solid"></button>';

                }
                html = html.replace(/\[GRADIENT\]/g, html_colors);

                //grad colors
                var html_gradcolors = '';
                for (var i = 0; i < this.settings.gradientcolors.length; i++) {
                    html_gradcolors += '<button data-elmgradient="' + this.settings.gradientcolors[i][0] + '" style="background-image:' + this.settings.gradientcolors[i][0] + ';width: 50px;border:none;"></button>';
                }
                html = html.replace(/\[GRADIENTCOLORS\]/g, html_gradcolors);

                jQuery('#divFb').append(html);

                if(bIsAppleMobile) {
                    jQuery('body,.is-modal,.is-pop,.is-side').noDoubleTapZoom();
                }

                //PLUGIN (Load plugins)
                plugin.getScripts([scriptPath + "config.js"], function () {
                    for (var i = 0; i < plugin.settings.plugins.length; i++) {
                        plugin.getScripts([scriptPath + 'plugins/' + plugin.settings.plugins[i] + '/plugin.js'], function () {

                        });
                    }
                });

                //Image Resizer
                if (typeof jQuery.ui !== 'undefined') {
                    jQuery("#divImgResizer").resizable({
                        handles: {
                            'ne': '.ui-resizable-ne',
                            'se': '.ui-resizable-se',
                            'sw': '.ui-resizable-sw',
                            'nw': '.ui-resizable-nw'
                        },
                        resize: function (event, ui) {
                            //do resize
                            var width = jQuery(event.target).width();
                            var height = jQuery(event.target).height();

                            var $img = jQuery("#divImageTool").data('active');
                            $img.css('width', width + 'px');
                            $img.css('height', 'auto');

                            //sync
                            var _top = $img.offset().top;
                            var _left = $img.offset().left;
                            var _width = $img.width();
                            var _height = $img.height();
                            jQuery("#divImgResizer").css("top", _top + 'px');
                            jQuery("#divImgResizer").css("left", _left + 'px');
                            jQuery("#divImgResizer").css("width", _width + "px");
                            jQuery("#divImgResizer").css("height", _height + "px");
                            repositionHandler(_width, _height);
                        },
                        stop: function (event, ui) {
                            var $img = jQuery("#divImageTool").data('active');
                            var originalWidth = jQuery("#divImgResizer").data("width");
                            var currentWidth = $img.width();
                            var percentage = (currentWidth / originalWidth) * 100;
                            $img.css('width', percentage + '%');

                            jQuery("#divImgResizer").data("resized", 1);
                            setTimeout(function(){
                                jQuery("#divImgResizer").data("resized", 0);
                            },300);
                        }
                    });

                    jQuery("#divImgResizer").on('click', function(){

                        //Show #divImageTool & #divElementTool

                        var $img = jQuery("#divImageTool").data('active');
                        var _toolwidth = jQuery("#divImageTool").width();
                        var _width = $img.outerWidth();
                        var _top = $img.offset().top;
                        var _left = $img.offset().left - 1;
                        //_left = _left + (_width - _toolwidth);
                        _left = _left + (_width/2 - _toolwidth/2);

                        //Adjust _left in case an element is outside the screen
                        var _screenwidth = jQuery(window).width();
                        var _imagetoolwidth = jQuery("#divImageTool").width();
                        if(_imagetoolwidth+_left>_screenwidth) _left = $img.offset().left;//_left=_screenwidth-_imagetoolwidth-10;

                        jQuery("#divImageTool").css("top", _top + "px");
                        jQuery("#divImageTool").css("left", _left + "px");
                        jQuery("#divImageTool").css("display", "block");

                        if(plugin.settings.elementTool) {
                            plugin.renderElementTool();
                            jQuery("#divElementTool").css("display", "block");
                        }

                        /*
                            Grid Editor has 'Element Tool' button to show/hide Element tool.
                            If Grid Editor is active, Element tool visibility is based on plugin.settings.elementTool.
                            If Grid Editor is not active (normal), Element tool visibility is based on Local Storage (if has set). If not, based on plugin.settings.elementTool (as originally set).
                        */
                        if(jQuery('.grideditor').hasClass('active')) {
                            if(!plugin.settings.elementTool) {
                                jQuery("#divElementTool").css("display", "none");
                            }
                        }  else {
                            if (localStorage.getItem("_hideelementtool") != null) {
                                if(localStorage.getItem("_hideelementtool")=='1'){
                                    jQuery("#divElementTool").css("display", "none");
                                }
                            } else {
                                if(!plugin.settings.elementTool) {
                                    jQuery("#divElementTool").css("display", "none");
                                }
                            }
                        }

                    });
                }
                // https://stackoverflow.com/questions/4860936/how-to-remove-the-resizig-handlers-around-an-image-in-ie-with-javascript
                document.body.addEventListener('mscontrolselect', function(evt){
                    evt.preventDefault();
                });

                if(bSideSnippets) {

                    var sHideHandle = '';
                    if(!this.settings.snippetHandle){
                        sHideHandle = 'display:none;';
                    }

                    if(!this.settings.emailMode){

                        var html_catselect = '';
                        for(var i=0;i<this.settings.snippetCategories.length;i++){
                            html_catselect += '<option value="' + this.settings.snippetCategories[i][0] + '">' + this.settings.snippetCategories[i][1] + '</option>';
                        }

                        var html_snippets = '' +
                            '<div style="position:absolute;top:0;right:0;padding: 0;width:100%;z-index:2;">' +
                                '<select id="selSnippetCat">' +
                                    html_catselect +
                                '</select>' +
                            '</div>' +
                            (this.settings.sidePanel=='right'?
                            '<div id="divSnippetScrollUp" style="top:calc(50% - 27px);right:25px;">&#9650;</div>' +
                            '<div id="divSnippetScrollDown" style="top:calc(50% + 27px);right:25px;">&#9660;</div>' +
                            '<div id="divSnippetHandle" style="' + sHideHandle + '">' +
                                '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>' +
                            '</div>' :
                            '<div id="divSnippetScrollUp" style="top:calc(50% - 27px);left:10px;">&#9650;</div>' +
                            '<div id="divSnippetScrollDown" style="top:calc(50% + 27px);left:10px;">&#9660;</div>' +
                            '<div id="divSnippetHandle" style="' + sHideHandle + '">' +
                                '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>' +
                            '</div>') +
                            '<div class="is-design-list"></div>';
                        var defaultcat = this.settings.defaultSnippetCategory; //120;
                    } else {

                        var html_catselect = '';
                        for(var i=0;i<this.settings.emailSnippetCategories.length;i++){
                            html_catselect += '<option value="' + this.settings.emailSnippetCategories[i][0] + '">' + this.settings.emailSnippetCategories[i][1] + '</option>';
                        }

                        var html_snippets = '' +
                            '<div style="position:absolute;top:0;right:0;padding: 0;width:100%;z-index:2;">' +
                                '<select id="selSnippetCat">' +
                                    html_catselect +
                                '</select>' +
                            '</div>' +
                            (this.settings.sidePanel=='right'?
                            '<div id="divSnippetScrollUp" style="top:calc(50% - 27px);right:25px;">&#9650;</div>' +
                            '<div id="divSnippetScrollDown" style="top:calc(50% + 27px);right:25px;">&#9660;</div>' +
                            '<div id="divSnippetHandle" style="' + sHideHandle + '">' +
                                '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>' +
                            '</div>' :
                            '<div id="divSnippetScrollUp" style="top:calc(50% - 27px);left:10px;">&#9650;</div>' +
                            '<div id="divSnippetScrollDown" style="top:calc(50% + 27px);left:10px;">&#9660;</div>' +
                            '<div id="divSnippetHandle" style="' + sHideHandle + '">' +
                                '<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>' +
                            '</div>') +
                            '<div class="is-design-list">' +
                            '</div>';
                        var defaultcat = this.settings.defaultEmailSnippetCategory; //14;
                    }

                    jQuery(this.settings.snippetList).append(html_snippets);

                    jQuery('#selSnippetCat').val(defaultcat);

                    var assetPath = _snippets_path;

                    var nIndex = 1;
                    jQuery.each(data_basic.snippets, function () {

                        this.id = nIndex; //Give id to each record

                        var thumb = this.thumbnail;

                        if (this.category == defaultcat) {
                            jQuery('.is-design-list').append('<div data-id="' + this.id + '" data-cat="' + this.category + '"><img src="' + assetPath + thumb + '"></div>');
                        }

                        nIndex++;
                    });

                    jQuery('.is-design-list > div').draggable({ //jQuery('#divSnippetList > div').draggable({
                        cursor: 'move',
                        helper: function (event, ui) {
                            return jQuery('<div class="dynamic" data-id="' + jQuery(this).data('id') + '"></div>')[0];
                        },
                        delay: 200,
                        connectToSortable: '.is-builder',
                        revert: "invalid",
                        drag: function(){
                            //sync
                            var $helper = jQuery('.dynamic');
                            var _top = $helper.offset().top;
                            var _left = $helper.offset().left;
                            var _width = $helper.width();
                            var _height = $helper.height();

                            var $helperClone = jQuery("#divSnippetDragHelper");
                            $helperClone.css("top", _top + 'px');
                            $helperClone.css("left", _left + 'px');
                            $helperClone.css("width", _width + "px");
                            $helperClone.css("height", _height + "px");
                            $helperClone.css("display",'block');
                        },
                        stop: function(e){
                            var $helperClone = jQuery("#divSnippetDragHelper");
                            $helperClone.css("display",'none');

                            $helperClone.attr('data-drag','yes');

                            jQuery('.dummy-space').remove();
                        },
                        start: function(){
                            jQuery('.is-builder').append('<div class="dummy-space" style="clear: both; line-height: 100px;outline:none !important;">&nbsp;</div>');
                        }
                    });

                    jQuery('#selSnippetCat').on('change', function () {
                        var cat = jQuery(this).val();

                        if (jQuery('.is-design-list').children('[data-cat=' + cat + ']').length == 0) {

                            jQuery.each(data_basic.snippets, function () {

                                var thumb = this.thumbnail;

                                if (cat == this.category) {
                                    jQuery('.is-design-list').append('<div data-id="' + this.id + '" data-cat="' + this.category + '"><img src="' + assetPath + thumb + '"></div>');
                                }

                            });

                        }

                        if (cat) {

                            jQuery('.is-design-list > div').fadeOut(0, function () {
                            });
                            jQuery('.is-design-list > div').each(function () {

                                var catSplit = jQuery(this).attr('data-cat').split(',');
                                for (var j = 0; j < catSplit.length; j++) {
                                    if (catSplit[j] == cat) {
                                        jQuery(this).fadeIn(300);
                                    }
                                }

                            });

                        }

                        jQuery('.is-design-list > div').draggable({
                            cursor: 'move',
                            helper: function (event, ui) {
                                return jQuery('<div class="dynamic" data-id="' + jQuery(this).data('id') + '"></div>')[0];
                            },
                            delay: 200,
                            connectToSortable: '.is-builder',
                            revert: "invalid"
                        });

                    });

                    jQuery('#divSnippetHandle').on('click', function(e){

                        if(jQuery('#divSnippetList').hasClass('active')) {
                            //-- Hide Side Panel
                            jQuery('#divSnippetList').removeClass('active');
                            jQuery('body').removeClass('body-fullview');
                            jQuery('body').removeClass('body-fullview-left');

                            if(plugin.settings.sidePanel=='right'){
                                jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>');
                            } else {
                                jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>');
                            }
                            //-- Hide Side Panel

                        } else {
                            plugin.viewSnippets(true);

                            if(plugin.settings.sidePanel=='right'){
                                jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>');
                            } else {
                                jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>');
                            }

                            //Additional
                            jQuery(".is-modal.grideditor").css("display", "none");

                        	e.preventDefault();
                    		e.stopImmediatePropagation();
                        }

                    });

                    //Scroll helper
                    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {

                    } else {
                        jQuery('#divSnippetScrollUp').css('display','none');
                        jQuery('#divSnippetScrollDown').css('display','none');
                    }
                    var maxScroll=100000000;
                    jQuery('#divSnippetScrollUp').css('display','none');
                    jQuery('#divSnippetScrollUp').on("click touchup", function(e) {
                        jQuery(".is-design-list").animate({ scrollTop: (jQuery(".is-design-list").scrollTop() - (jQuery(".is-design-list").height()-150) ) + "px" },300, function(){
                            if(jQuery(".is-design-list").scrollTop()!=0){
                                jQuery('#divSnippetScrollUp').fadeIn(300);
                            } else {
                                 jQuery('#divSnippetScrollUp').fadeOut(300);
                            }
                            if(jQuery(".is-design-list").scrollTop() != maxScroll){
                                jQuery('#divSnippetScrollDown').fadeIn(300);
                            } else {
                                 jQuery('#divSnippetScrollDown').fadeOut(300);
                            }
                        });

                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return false;
                    });
                    jQuery('#divSnippetScrollDown').on("click touchup", function(e) {
                        jQuery(".is-design-list").animate({ scrollTop: (jQuery(".is-design-list").scrollTop() + (jQuery(".is-design-list").height()-150) ) + "px" }, 300, function() {
                            if(jQuery(".is-design-list").scrollTop()!=0){
                                jQuery('#divSnippetScrollUp').fadeIn(300);
                            } else {
                                jQuery('#divSnippetScrollUp').fadeOut(300);

                            }
                            if(maxScroll==100000000){
                                maxScroll = jQuery('.is-design-list').prop('scrollHeight') - jQuery('.is-design-list').height() - 30;
                            }

                            if(jQuery(".is-design-list").scrollTop() != maxScroll){
                                jQuery('#divSnippetScrollDown').fadeIn(300);
                            } else {
                                jQuery('#divSnippetScrollDown').fadeOut(300);
                            }
                        });

                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return false;
                    });

                    if (localStorage.getItem("_opensnippets") != null) {
                        if(localStorage.getItem("_opensnippets")=='1'){
                            this.settings.snippetOpen = true;
                        } else {
                            this.settings.snippetOpen = false;
                        }
                    }

                    var _screenwidth = jQuery(window).width();
                    if(this.settings.snippetOpen && _screenwidth>=960){

                        jQuery('#divSnippetList').css('transition','all ease 0.8s');
                        jQuery('body').css('transition','all ease 0.8s');
                        plugin.viewSnippets(true);

                        setTimeout(function(){
                            jQuery('#divSnippetList').css('transition','');
                            jQuery('body').css('transition','');
                        },1300);

                    }

                }


                //custom grad colors
                if (localStorage.getItem("_customgradcolors") != null) {
                    customgradcolors = JSON.parse(localStorage.getItem("_customgradcolors"));

                    var html_gradcolors = '';
                    for (var i = 0; i < customgradcolors.length; i++) {
                        html_gradcolors += '<button class="is-elmgrad-item" data-elmgradient="' + customgradcolors[i] + '" style="background-image:' + customgradcolors[i] + ';width: 50px;border:none;"><div class="is-elmgrad-remove"><svg class="is-icon-flex" style="fill:rgba(255, 255, 255, 1);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div></button>';
                    }
                    jQuery('#divCustomElmGradColors').html(html_gradcolors);
                }

                if (localStorage.getItem("_scrollableeditor") != null) {
                    if(localStorage.getItem("_scrollableeditor")=='1'){
                        this.settings.scrollableEditingToolbar = true;
                    } else {
                        this.settings.scrollableEditingToolbar = false;
                    }
                }
                if (localStorage.getItem("_editingtoolbar") != null) {
                    this.settings.toolbar = localStorage.getItem("_editingtoolbar");
                }
                if (localStorage.getItem("_editingtoolbardisplay") != null) {
                    this.settings.toolbarDisplay = localStorage.getItem("_editingtoolbardisplay");
                }
                if (localStorage.getItem("_hideelementtool") != null) {
                    if(localStorage.getItem("_hideelementtool")=='1'){
                        plugin.settings.elementTool = false;
                    } else {
                        plugin.settings.elementTool = true;
                    }
                }
                if (localStorage.getItem("_outlinemode") != null) {
                    plugin.settings.outlineMode = localStorage.getItem("_outlinemode");
                }

                //Enable/disable features
                if (plugin.settings.imageEmbed == false) jQuery('.image-embed').addClass('display-none');
                //if (plugin.settings.columnHtmlEditor == false) jQuery('.cell-html').addClass('display-none');
                if (plugin.settings.emailMode == true){
                    //jQuery('.cell-fontfamily').remove();
                    jQuery('.cell-icon').remove();
                    jQuery('.div-font-size button[data-value=more]').remove();
                }

                setTimeout(function () {
                    plugin.refreshToolbar();
                    plugin.positionToolbar();
                },700);

                jQuery('html').on('click touchstart', function (e) {

                    if(bSnippetDropped) { //FF fix (to prevent snippet sidebar closed after snippet drag & drop)
                        bSnippetDropped=false;
                        if (navigator.userAgent.indexOf("Firefox") > 0) return;
                    }

                    //iframe overlay
                    if (!jQuery(e.target).hasClass('ovl')) {
                        jQuery('.ovl').css('display', 'block');
                    }

                    if (jQuery(e.target).parents('.is-tabs-more').length > 0 || jQuery(e.target).hasClass('is-tabs-more')) {
                        return;
                    } else {
                        jQuery('.is-tabs-more').css('display', 'none');
                    }

                    if (jQuery(e.target).parents('#divRteTool').length > 0) return;
                    if (jQuery(e.target).parents('#divCellTool').length > 0) return;
                    if (jQuery(e.target).parents('#divRowAddTool').length > 0) return;
                    if (jQuery(e.target).parents('#divSpacerTool').length > 0) return;
                    if (jQuery(e.target).parents('#divElementTool').length > 0) { return; }
                    if (jQuery(e.target).parents('#divLinkTool').length > 0) return;
                    if (jQuery(e.target).parents('#divIconTool').length > 0) return;
                    if (jQuery(e.target).parents('#divImageTool').length > 0) return;
                    if (jQuery(e.target).parents('#divTableTool').length > 0) return;
                    if (jQuery(e.target).parents('#divIframeTool').length > 0) return;
                    if (jQuery(e.target).parents('#divCustomCodeTool').length > 0) return;
                    if (jQuery(e.target).parents('#divCustomModuleTool').length > 0) return;
                    if (jQuery(e.target).parents('.is-pop').length > 0) return;
                    if (jQuery(e.target).hasClass('is-pop')) return;
                    if (jQuery(e.target).parents('.is-plugin-tool').length > 0) return;
                    if (jQuery(e.target).hasClass('is-plugin-tool')) return;
                    if (jQuery(e.target).hasClass('row-add-initial')) return;
                    if (jQuery(e.target).parents('.is-modal').length > 0) return;
                    if (jQuery(e.target).hasClass('is-modal')) return;
                    if (jQuery(e.target).hasClass('is-modal-overlay')) return;
                    if (jQuery(e.target).hasClass('sl-overlay')) return; //simplelightbox overlay
                    if (jQuery(e.target).parents('.sl-wrapper').length > 0) return; //simplelightbox controls

                    var $focused = jQuery(':focus');
                    if ($focused.parents('.is-modal').length > 0) return;
                    if ($focused.parents('.is-pop').length > 0) return;
                    if ($focused.parents('.is-plugin-tool').length > 0) return;
                    if (jQuery(e.target).parents('#divImgResizer').length > 0 || jQuery(e.target).attr('id')=='divImgResizer') return;
                    if (jQuery(e.target).parents('#divSnippetDragHelper').length > 0 || jQuery(e.target).attr('id')=='divSnippetDragHelper') return;

                    var $helper = jQuery('#divSnippetDragHelper');
                    if($helper.attr('data-drag')=='yes') {
                        $helper.attr('data-drag','stop');
                        return;
                    }
                    $helper.css('display','none');

                    if (jQuery(e.target).parents('.is-side').length > 0) return;
                    if (jQuery(e.target).hasClass('is-side')) return;
                    if (jQuery(e.target).parents('.element-edit').length > 0) return;
                    if (jQuery(e.target).hasClass('element-edit')) return;

                    jQuery(".is-modal.grideditor").css("display", "");

                    //Normalize (including editable area clicked)

                    //-- Hide Snippet Panel
                    if(jQuery('.is-side.snippetlist').hasClass('active') && (jQuery('body').hasClass('body-fullview') || jQuery('body').hasClass('body-fullview-left'))) {
                        jQuery('body').removeClass('body-fullview');
                        jQuery('body').removeClass('body-fullview-left');

                        //if an image is selected when snippets panel closing/sliding, re-adjust image tools' position.
                        if(jQuery("#divImageTool").css("display")=='block'){
                            jQuery("#divImageTool").css("display", "none");
                            jQuery("#divImgResizer").css("display", "none");
                            setTimeout(function () {
                                var $img = jQuery("#divImageTool").data('active');
                                $img.trigger('click');
                            },700);
                        }
                        if(jQuery("#divCustomModuleTool").css("display")=='block'){
                            jQuery("#divCustomModuleTool").css("display", "none");
                            setTimeout(function () {
                                var $block = jQuery('#divCellTool').data('active');
                                $block.trigger('click');
                            },700);
                        }
                        if(jQuery("#divIframeTool").css("display")=='block'){
                            jQuery("#divIframeTool").css("display", "none");
                            setTimeout(function () {
                                var $block = jQuery('#divCellTool').data('active');
                                $block.find('iframe').trigger('click');
                            },700);
                        }
						setTimeout(function () {
                            plugin.renderLayoutTool();
                        },700);
                    }
                    jQuery('.is-side.snippetlist').removeClass('active');

                    if(plugin.settings.sidePanel=='right'){
                        jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>');
                    } else {
                        jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>');
                    }
                    //-- Hide Snippet Panel

                    //Editable area
                    if (jQuery(e.target).parents('.is-builder').length > 0) return;

                    //Normalize (excluding editable area clicked)

                    //-- Hide Side Panel
                    jQuery('.is-side').removeClass('active');
                    jQuery('.elm-inspected').removeClass('elm-inspected');
                    jQuery('body').removeClass('body-fullview');
                    jQuery('body').removeClass('body-fullview-left');
                    if(plugin.settings.sidePanel=='right'){
                        jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>');
                    } else {
                        jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>');
                    }
                    jQuery('#divEditStyle').css('display','none');
                    jQuery('[data-saveforundo]').removeAttr('data-saveforundo');
                    //-- Hide Side Panel

                    jQuery('.cell-active').removeClass('cell-active');
                    jQuery('.row-active').removeClass('row-active');
                    jQuery('.row-outline').removeClass('row-outline');
                    jQuery('#divRteTool').css('display', 'none');
                    jQuery(".is-row-tool").css("display", "");
                    jQuery('#divCellTool').css('display', 'none');
                    jQuery('#divRowAddTool').css('display', 'none');
                    jQuery('#divSpacerTool').css('display', 'none');
                    jQuery('#divElementTool').css('display', 'none');
                    jQuery("#divIconTool").css("display", "none");
                    jQuery("#divImageTool").css("display", "none");
                    jQuery("#divTableTool").css("display", "none");
                    jQuery("#divIframeTool").css("display", "none");
                    jQuery("#divCustomCodeTool").css("display", "none");
                    jQuery("#divCustomModuleTool").css("display", "none");
                    jQuery("#divLinkTool").css("display", "none"); //Hide is-plugin-tool
                    jQuery('.is-plugin-tool').css('display', 'none');
                    jQuery('.is-pop').css('display', 'none');
                    if(jQuery("#divImgResizer").data("resized")!="1") {
                        jQuery("#divImgResizer").css("display", "none");
                    }
                    jQuery(".is-modal.grideditor").css("display", "none");

                    if (bIsAppleMobile) {
                        jQuery('[contenteditable]').attr('contenteditable', 'false');
                    }
                });

                var _screenwidth = jQuery(window).width();
                if(_screenwidth <=640) {
                    //jQuery('#divRteTool').addClass('hidden');
                }

                //jQuery(window).off('resize');
                jQuery(window).on('resize', function (e) {
                    //hideAllTools
                    plugin.hideElementTools(true);
                    jQuery("#divCellTool").css("display", "none");
                    jQuery("#divRowAddTool").css("display", "none");
                    jQuery(".is-row-tool").css("display", "");
                    jQuery("#divRteTool").css("display", "none");
                    jQuery(".row-active").removeClass("row-active");
                    jQuery(".cell-active").removeClass("cell-active");

                    plugin.positionToolbar();

                    if (jQuery(e.target).parents('#divImgResizer').length > 0 || jQuery(e.target).attr('id')=='divImgResizer') {
                        //do not hide image resizer
                    } else {
                        jQuery("#divImgResizer").css("display", "none");
                    }

                    /*var _screenwidth = jQuery(window).width();
                    if(_screenwidth <=640) {
                        jQuery('#divRteTool').addClass('hidden');
                    } else {
                        jQuery('#divRteTool').removeClass('hidden');
                    }*/
                });

                jQuery(window).on('scroll', function(){
                    jQuery('.is-pop').css('display', 'none');
                });

                //Undo Redo
                //jQuery(document).off('keydown');
                jQuery(document).on('keydown', function(e) {
                    if (e.which === 90 && e.ctrlKey) {//CTRL-Z
                        if(e.shiftKey) plugin.doRedo();
                        else {
                            if (!e.altKey) {
                                //if(!document.queryCommandEnabled('undo')){
                                plugin.doUndo();
                                //}
                            }
                        }
                    }
                    if (e.which === 89 && e.ctrlKey) {//CTRL-Y
                        if (!e.altKey) plugin.doRedo();
                    }
                });

                //Enable drag on modal dialogs
                //Insipred by: https://www.kirupa.com/html5/drag.htm
                document.addEventListener("touchstart", dragStart, false);
                document.addEventListener("touchend", dragEnd, false);
                document.addEventListener("touchmove", drag, false);
                document.addEventListener("mousedown", dragStart, false);
                document.addEventListener("mouseup", dragEnd, false);
                document.addEventListener("mousemove", drag, false);

            }


            //tabs
            jQuery('.is-tabs a').off('click');
            jQuery('.is-tabs a').on('click', function () {

                if (jQuery(this).hasClass('active')) return false;

                var id = jQuery(this).attr('data-content');
                if(!id){
                    return false;
                }
                var group = jQuery(this).parent().attr('data-group');

                jQuery('.is-tabs[data-group="' + group + '"] > a').removeClass('active');
                jQuery('.is-tabs-more[data-group="' + group + '"] > a').removeClass('active');

                jQuery(this).addClass('active');

                jQuery('.is-tab-content[data-group="' + group + '"]').css('display', 'none');
                jQuery('#' + id).css('display', 'block');

                jQuery('.is-tabs-more').css('display', 'none');

                return false;
            });

            jQuery('.is-tabs-more a').off('click');
            jQuery('.is-tabs-more a').on('click', function () {

                if (jQuery(this).hasClass('active')) return false;

                var id = jQuery(this).attr('data-content');
                var group = jQuery(this).parent().attr('data-group');

                jQuery('.is-tabs-more > a').removeClass('active');
                jQuery('.is-tabs[data-group="' + group + '"] > a').removeClass('active');

                jQuery(this).addClass('active');

                jQuery('.is-tab-content[data-group="' + group + '"]').css('display', 'none');
                jQuery('#' + id).css('display', 'block');

                jQuery('.is-tabs-more').css('display', 'none');

                return false;
            });

            //tabs (other)
            jQuery(".is-tab-links").children().each(function () {
                jQuery(this).off('click');
                jQuery(this).on('click', function (e) {
                    jQuery(".is-tab-links > a").removeClass("active");
                    jQuery(this).addClass("active");

                    var contentid = jQuery(this).attr("data-tab-content");
                    jQuery("#" + contentid).parent().children().each(function () {
                        jQuery(this).css("display", "none");
                    });
                    jQuery("#" + contentid).css("display", "table");
                    return false;
                });
            });


            //Get $wrapper. Wrapper can contains multiple containers/builders (ex. .is-wrapper) or single container/builder (ex. .is-container)
            if (jQuery(plugin.settings.page).length == 1) {
                //plugin.settings.page => parent container that has multiple editable container
                $wrapper = jQuery(plugin.settings.page);
            } else {
                var $block = jQuery('#divCellTool').data('active');//Choose avtive container based on active block
                if ($block) {
                    $wrapper = $block.parents(plugin.settings.container).first();
                } else {
                    $wrapper = jQuery(plugin.settings.container).first();//If no active container, choose one (or first one if multiple container exists). This may not happens (just in case).
                }
            }

            //Open cell tool's dropmenu
            jQuery('.cell-tool-menu').off('click');
            jQuery('.cell-tool-menu').on('click', function (e) {
                plugin.hideElementTools();

                var _toolheight = jQuery("#divCellTool").outerHeight();

                var _top = jQuery(this).offset().top + (_toolheight+2);
                var _left = jQuery(this).offset().left - 1;
                jQuery("#divCellToolMenu").css("top", _top + "px");
                jQuery("#divCellToolMenu").css("left", _left + "px");
                jQuery("#divCellToolMenu").css("display", "block");
            });

            //RTE prev/next controls
            jQuery('.cell-tool-prev').css('display', 'none');
            //jQuery('.cell-tool-next').css('display', 'block');
            //initialRteWidth = jQuery('.cell-tool-option-container').outerWidth(); //360px

            jQuery('.cell-tool-prev').off('click');
            jQuery('.cell-tool-prev').on('click', function (e) {

                jQuery('.cell-tool-option-container').css('width', initialRteWidth + 'px');

                plugin.hideElementTools();

                var con = jQuery('.cell-tool-option-container').width();
                var con_item = jQuery('.cell-tool-option-container > div').width();

                var _left = parseInt(jQuery('.cell-tool-option-container > div').css('left'));
                _left = _left + con;
                jQuery('.cell-tool-option-container > div').css('left', _left + 'px');

                if ((con_item + _left) > con) {
                    jQuery('.cell-tool-prev').css('display', 'block');
                    jQuery('.cell-tool-next').css('display', 'block');
                }
                if (_left == 0) {
                    jQuery('.cell-tool-prev').css('display', 'none');
                    jQuery('.cell-tool-next').css('display', 'block');
                }
                if ((con_item + _left) == con) {
                    jQuery('.cell-tool-prev').css('display', 'block');
                    jQuery('.cell-tool-next').css('display', 'none');
                }
            });

            jQuery('.cell-tool-next').off('click');
            jQuery('.cell-tool-next').on('click', function (e) {

                plugin.hideElementTools();

                var con = jQuery('.cell-tool-option-container').width();
                var con_item = jQuery('.cell-tool-option-container > div').width();

                var _left = parseInt(jQuery('.cell-tool-option-container > div').css('left'));
                _left = _left - con;
                jQuery('.cell-tool-option-container > div').css('left', _left + 'px');

                if (con_item + _left <= con) {
                    jQuery('.cell-tool-prev').css('display', 'block');
                    jQuery('.cell-tool-next').css('display', 'none');
                }
                if ((con_item + _left) > con) {
                    jQuery('.cell-tool-prev').css('display', 'block');
                    jQuery('.cell-tool-next').css('display', 'block');
                }
                if (_left == 0) {
                    jQuery('.cell-tool-prev').css('display', 'none');
                    jQuery('.cell-tool-next').css('display', 'block');
                }
                if ((con_item + _left) <= con) {
                    jQuery('.cell-tool-prev').css('display', 'block');
                    jQuery('.cell-tool-next').css('display', 'none');
                    jQuery('.cell-tool-option-container').css('width', (con_item + _left) + 'px');
                }
            });

            //CELL

            jQuery('.cell-up').off('click');
            jQuery('.cell-up').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //Save for Undo
                plugin.saveForUndo();

                if ($block.parent().children().not('.is-row-tool').length == 1) {

                    if($block.parent().prev().children().not('.is-row-tool').length>=4){
                        //max col=4
                        $block.parent().find('.is-row-tool').find('.row-up').trigger('click');

                        plugin.applyBehavior();

                        plugin.hideElementTools();
                        plugin.renderLayoutTool();

                        //Trigger Change event
                        plugin.settings.onChange();

                        return;
                    }

                    if ($block.parent().prev().length > 0) {
                        $block.parent().prev().append($block); //prepend
                        $block.parent().next().remove();
                    } else {
                        //move outside container
                        plugin.moveCellToPrevContainer($block)
                    }
                } else {
                    var $rowElement = $block.parent().clone();
                    $rowElement.html('');
                    $block.insertBefore($block.parent()).wrap($rowElement);
                }

                //fix layout
                plugin.fixLayout($block.parent());
                plugin.fixLayout($block.parent().next());

                plugin.applyBehavior();

                plugin.hideElementTools();
                plugin.renderLayoutTool();
                plugin.checkEmpty();

                //Trigger Change event
                plugin.settings.onChange();
            });

            jQuery('.cell-down').off('click');
            jQuery('.cell-down').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //Save for Undo
                plugin.saveForUndo();

                if ($block.parent().children().not('.is-row-tool').length == 1) {

                    if($block.parent().next().children().not('.is-row-tool').length>=4){
                        //max col=4
                        $block.parent().find('.is-row-tool').find('.row-down').trigger('click');

                        plugin.applyBehavior();

                        plugin.hideElementTools();
                        plugin.renderLayoutTool();

                        //Trigger Change event
                        plugin.settings.onChange();

                        return;
                    }

                    if ($block.parent().next().length > 0) {
                        $block.parent().next().append($block); //prepend
                        $block.parent().prev().remove();
                    } else {
                        //move outside container
                        plugin.moveCellToNextContainer($block);
                    }
                } else {
                    var $rowElement = $block.parent().clone();
                    $rowElement.html('');
                    $block.insertAfter($block.parent()).wrap($rowElement);
                }

                plugin.checkEmpty();

                //fix layout
                plugin.fixLayout($block.parent());
                plugin.fixLayout($block.parent().prev());

                plugin.applyBehavior();

                plugin.hideElementTools();
                plugin.renderLayoutTool();

                //Trigger Change event
                plugin.settings.onChange();
            });

            jQuery('.cell-prev').off('click');
            jQuery('.cell-prev').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                if ($block.prev().not('.is-row-tool').length > 0) {

                    //Save for Undo
                    plugin.saveForUndo();

                    $block.insertBefore($block.prev().not('.is-row-tool'));

                    plugin.hideElementTools();
                    plugin.renderLayoutTool();

                    //Trigger Change event
                    plugin.settings.onChange();
                }
            });

            jQuery('.cell-next').off('click');
            jQuery('.cell-next').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                if ($block.next().not('.is-row-tool').length > 0) {

                    //Save for Undo
                    plugin.saveForUndo();

                    $block.insertAfter($block.next().not('.is-row-tool'));

                    plugin.hideElementTools();
                    plugin.renderLayoutTool();

                    //Trigger Change event
                    plugin.settings.onChange();
                }
            });

            jQuery('.cell-remove').off('click');
            jQuery('.cell-remove').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //change to column selection
                jQuery('.cell-active').removeClass('cell-active');
                jQuery('.row-active').removeClass('row-active');
                $block.addClass('cell-active');

                //show modal
                var $modal = jQuery('.is-modal.delconfirm');
                plugin.showModal($modal, false, true);

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $block = jQuery('#divCellTool').data('active');
                    var $row = $block.parent();
                    if ($row.children().not('.is-row-tool').length == 1) {
                        $row.remove();
                    } else {
                        $block.remove();

                        //fix layout
                        plugin.fixLayout($row);
                    }

                    jQuery('#divCellTool').data('active','');

                    plugin.checkEmpty();

                    plugin.hideModal($modal);
                });

                //Trigger Change event
                plugin.settings.onChange();
            });

            jQuery('.cell-duplicate').off('click');
            jQuery('.cell-duplicate').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //change to column selection
                plugin.hideElementTools();
                jQuery('.cell-active').removeClass('cell-active');
                jQuery('.row-active').removeClass('row-active');
                $block.addClass('cell-active');

                //Limit up to 4 cells in a row
                if ($block.parent().children().not('.is-row-tool').length >= 4) {
                    alert(out('You can add max 4 column in a row'));
                    return false;
                }

                //Save for Undo
                plugin.saveForUndo();

                $block.clone().insertBefore($block).removeClass('cell-active');

                plugin.applyBehavior();

                //fix layout
                plugin.fixLayout($block.parent());

                plugin.renderLayoutTool();

                //Trigger Change event
                plugin.settings.onChange();

                //Trigger Render event
                plugin.settings.onRender();
            });

            jQuery('.cell-outline').off('click');
            jQuery('.cell-outline').on('click', function (e) {
                if(jQuery('.is-builder[gridoutline]').length == 0) {
                    jQuery('.is-builder').attr('gridoutline', '');
                } else {
                    jQuery('.is-builder').removeAttr('gridoutline');
                }
            });

            jQuery('.cell-elmtool').off('click');
            jQuery('.cell-elmtool').on('click', function (e) {
                if(jQuery('#divElementTool').css('display') == 'none') {
                    jQuery('#divElementTool').css('display', 'block');
                    plugin.settings.elementTool = true;
                } else {
                    jQuery('#divElementTool').css('display', 'none');
                    plugin.settings.elementTool = false;
                }
            });

            jQuery('.cell-add').off('click');
            jQuery('.cell-add').on('click', function (e) {
                jQuery(".cell-add-options").data('mode', 'cell');

                var _top = jQuery(this).offset().top + 8;
                var _left = jQuery(this).offset().left + 56;
                jQuery(".cell-add-options").css("top", _top + "px");
                jQuery(".cell-add-options").css("left", _left + "px");
                jQuery(".cell-add-options").css("display", "block");
                jQuery(".cell-add-options").removeClass("arrow-top");
                jQuery(".cell-add-options").removeClass("arrow-right");
                jQuery(".cell-add-options").removeClass("arrow-bottom");
                jQuery(".cell-add-options").removeClass("center");
                jQuery(".cell-add-options").addClass("arrow-left");

                var _screenwidth = jQuery(window).width();
                if(_screenwidth <= 640) {
                    jQuery(".cell-add-options").css("display", "flex");
                } else {
                    jQuery(".cell-add-options").css("display",  "block");
                }
                jQuery('.cell-add-options .is-pop-close').off('click');
                jQuery('.cell-add-options .is-pop-close').on('click', function (e) {
                    jQuery(".cell-add-options").css("display", "none");
                });
            });

            jQuery('.cell-add-headline').off('click');
            jQuery('.cell-add-headline').on('click', function (e) {
                plugin.addContent('<div class="display"><h1>Headline Goes Here</h1><p>Lorem Ipsum is simply dummy text</p></div>');
            });

            jQuery('.cell-add-heading1').off('click');
            jQuery('.cell-add-heading1').on('click', function (e) {
                plugin.addContent('<h1>Heading 1 here</h1>');
            });

            jQuery('.cell-add-heading2').off('click');
            jQuery('.cell-add-heading2').on('click', function (e) {
                plugin.addContent('<h2>Heading 2 here</h2>');
            });

            jQuery('.cell-add-heading3').off('click');
            jQuery('.cell-add-heading3').on('click', function (e) {
                plugin.addContent('<h3>Heading 3 here</h3>');
            });

            jQuery('.cell-add-paragraph').off('click');
            jQuery('.cell-add-paragraph').on('click', function (e) {
                plugin.addContent('<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>');
            });

            jQuery('.cell-add-preformatted').off('click');
            jQuery('.cell-add-preformatted').on('click', function (e) {
                plugin.addContent('<pre>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</pre>');
            });

            jQuery('.cell-add-list').off('click');
            jQuery('.cell-add-list').on('click', function (e) {
                plugin.addContent('<ul style="list-style: initial;padding-left: 20px;">' +
                        '<li>Lorem Ipsum is simply dummy text</li>' +
                        '<li>Lorem Ipsum is simply dummy text</li>' +
                    '</ul>');
            });

            jQuery('.cell-add-quote').off('click');
            jQuery('.cell-add-quote').on('click', function (e) {
                plugin.addContent('<blockquote>Lorem Ipsum is simply dummy text</blockquote>');
            });

            jQuery('.cell-add-spacer').off('click');
            jQuery('.cell-add-spacer').on('click', function (e) {
                plugin.addContent('<div class="spacer height-80"></div>', 'data-noedit');
            });

            jQuery('.cell-add-button').off('click');
            jQuery('.cell-add-button').on('click', function (e) {
                plugin.addContent('<div>' +
                    '<a href="#" style="display:inline-block;text-decoration:none;transition: all 0.16s ease;border-style:solid;cursor:pointer;background-color: rgb(220, 220, 220); color: rgb(0, 0, 0); border-color: rgb(220, 220, 220); border-width: 2px; border-radius: 0px; padding: 13px 28px; line-height: 1.5; text-transform: uppercase; font-weight: 400; font-size: 14px; letter-spacing: 3px;">Read More</a>' +
                    /*'<a href="#" class="is-btn is-btn-ghost2 is-upper is-btn-small">Read More</a>' +*/
                '</div>');
            });

            jQuery('.cell-add-hr').off('click');
            jQuery('.cell-add-hr').on('click', function (e) {
                plugin.addContent('<hr />', 'data-noedit');
            });

            jQuery('.cell-add-table').off('click');
            jQuery('.cell-add-table').on('click', function (e) {
                plugin.addContent('<table class="default" style="border-collapse:collapse;width:100%;"><tr><td><br></td><td><br></td></tr><tr><td><br></td><td><br></td></tr></table>');
            });

            jQuery('.cell-add-image').off('click');
            jQuery('.cell-add-image').on('click', function (e) {
                jQuery("#divRowAddTool").css("opacity", "0");
                plugin.addContent('<img onload="_imgLoaded(this)" src="' + scriptPath + 'example.jpg">');
                /*setTimeout(function () {
                    jQuery("#divRowAddTool").css("opacity", "1");
                },600);*/
            });

            jQuery('.cell-add-more').off('click');
            jQuery('.cell-add-more').on('click', function (e) {

                plugin.hideElementTools();

                var $modal = jQuery('.is-modal.snippets');
                $modal.addClass('active');

                if ($modal.find('iframe').attr('src') == 'about:blank') {
                    $modal.find('iframe').attr('src', plugin.settings.snippetData);
                }

                $modal.not('.is-modal *').off('click');
                $modal.not('.is-modal *').on('click', function (e) {
                    if (jQuery(e.target).hasClass('is-modal')) {

                        $modal.removeClass('active');
                    }
                });

            });

            jQuery('.cell-html').off('click');
            jQuery('.cell-html').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //change to column selection
                jQuery('.cell-active').removeClass('cell-active');
                jQuery('.row-active').removeClass('row-active');
                $block.addClass('cell-active');

                if(plugin.settings.htmlSyntaxHighlighting) {

                    //prepare modal
                    var $modal = jQuery('.is-modal.viewhtmlformatted');

                    //get values
                    var html = plugin.readHtmlBlock($block);
                    $modal.find('textarea').val(html);

                    //used  by larger editor dialog (html.html)
                    jQuery('textarea').removeAttr('data-source-active');
                    jQuery('textarea').removeAttr('data-source-ok');
                    jQuery('textarea').removeAttr('data-source-cancel');
                    $modal.find('textarea').attr('data-source-active','1');
                    $modal.find('textarea').attr('data-source-ok','.viewhtmlformatted .input-ok');
                    $modal.find('textarea').attr('data-source-cancel','.viewhtmlformatted .input-cancel');

                    //show modal
                    $modal.addClass('active');
                    $modal.addClass('is-modal-small');
                    $modal.removeClass('is-modal-full');
                    plugin.showModal($modal, true, true);

                    $modal.find('#ifrHtmlFormatted').attr('src', scriptPath+'html_small.html?1');

                    $modal.find('.input-cancel').off('click');
                    $modal.find('.input-cancel').on('click', function (e) {

                        $modal.removeClass('is-modal-small');
                        plugin.hideModal($modal);

                    });

                    $modal.find('.input-ok').off('click');
                    $modal.find('.input-ok').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var html = $modal.find('textarea').val();

                        var $block = jQuery('#divCellTool').data('active');
                        $block.html(html);

                        plugin.applyBehavior();

                        //Trigger Change event
                        plugin.settings.onChange();

                        //Trigger Render event
                        plugin.settings.onRender();

                        $modal.removeClass('is-modal-small');
                        plugin.hideModal($modal);

                    });

                    //Open Larger Editor
                    jQuery('.viewhtmlformatted .cell-html-larger').off('click');
                    jQuery('.viewhtmlformatted .cell-html-larger').on('click', function (e) {

                        //show modal
                        var $modal = jQuery('.is-modal.viewhtmlformatted');
                        if($modal.hasClass('is-modal-small')) {
                            $modal.removeClass('is-modal-small');
                            $modal.addClass('is-modal-full');
                        } else {
                            $modal.addClass('is-modal-small');
                            $modal.removeClass('is-modal-full');
                        }
                    });

                } else {

                    //show modal
                    var $modal = jQuery('.is-modal.viewhtml');
                    $modal.addClass('is-modal-small');
                    plugin.showModal($modal, true, true);

                    //get values
                    var html = plugin.readHtmlBlock($block);
                    $modal.find('textarea').val(html);

                    $modal.find('.cell-html-cancel').off('click');
                    $modal.find('.cell-html-cancel').on('click', function (e) {

                        $modal.removeClass('is-modal-small');
                        plugin.hideModal($modal);

                    });

                    $modal.find('.cell-html-ok').off('click');
                    $modal.find('.cell-html-ok').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var html = $modal.find('textarea').val();
                        //html = plugin.fromViewToActual(html);

                        var $block = jQuery('#divCellTool').data('active');
                        $block.html(html);

                        plugin.applyBehavior();

                        //Trigger Change event
                        plugin.settings.onChange();

                        //Trigger Render event
                        plugin.settings.onRender();

                        $modal.removeClass('is-modal-small');
                        plugin.hideModal($modal);

                    });

                    //Open Larger Editor
                    jQuery('.viewhtml .cell-html-larger').off('click');
                    jQuery('.viewhtml .cell-html-larger').on('click', function (e) {

                        //used  by larger editor dialog (html.html)
                        jQuery('textarea').removeAttr('data-source-active');
                        jQuery('textarea').removeAttr('data-source-ok');
                        jQuery('textarea').removeAttr('data-source-cancel');
                        jQuery('.viewhtml textarea').attr('data-source-active','1');
                        jQuery('.viewhtml textarea').attr('data-source-ok','.viewhtml .cell-html-ok');
                        jQuery('.viewhtml textarea').attr('data-source-cancel','.viewhtml .cell-html-cancel');

                        //show modal
                        var $modal = jQuery('.is-modal.viewhtmllarger');
                        $modal.addClass('active');
                        plugin.showModal($modal);

                        $modal.find('#ifrHtml').attr('src', scriptPath+'html.html?1');
                    });

                }

            });

            jQuery('.cell-decrease').off('click');
            jQuery('.cell-decrease').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                var $blocknext = $block.next().not('.is-row-tool');
                if($blocknext.length==0) {
                    $blocknext = $block.prev().not('.is-row-tool');
                    if($blocknext.length==0) return;
                    var $blocknext2 = $blocknext.prev().not('.is-row-tool');
                } else {
                    var $blocknext2 = $blocknext.next().not('.is-row-tool');
                    if($blocknext2.length==0) $blocknext2 = $block.prev().not('.is-row-tool');
                }

                var rowClass = plugin.settings.row;
                var colClass = plugin.settings.cols;
                var colSizes = plugin.settings.colsizes;
                if(rowClass!='' && colClass.length> 0 && colSizes.length>0){

                    if($blocknext2.length>0){
                        for (var i = 0; i < colSizes.length; i++) {
                            var group = colSizes[i];
                            for (var j = 0; j < group.length; j++) {

                                if(group[j].length == 3){

                                    if($block.hasClass(group[j][0]) && $blocknext.hasClass(group[j][1]) && $blocknext2.hasClass(group[j][2])) {
                                        if(j==0){
                                            //cannot be decreased
                                        } else {
                                            $block.removeClass(group[j][0]);
                                            $blocknext.removeClass(group[j][1]);
                                            $blocknext2.removeClass(group[j][2]);
                                            $block.addClass(group[j-1][0]);
                                            $blocknext.addClass(group[j-1][1]);
                                            $blocknext2.addClass(group[j-1][2]);

                                            plugin.renderRowAddTool(); //needed to update divRowAddTool position
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                    }

                    for (var i = 0; i < colSizes.length; i++) {
                        var group = colSizes[i];
                        for (var j = 0; j < group.length; j++) {

                            if(group[j].length == 2){

                                if($block.hasClass(group[j][0]) && $blocknext.hasClass(group[j][1])) {
                                    if(j==0){
                                        //cannot be decreased
                                    } else {
                                        $block.removeClass(group[j][0]);
                                        $blocknext.removeClass(group[j][1]);
                                        $block.addClass(group[j-1][0]);
                                        $blocknext.addClass(group[j-1][1]);

                                        plugin.renderRowAddTool(); //needed to update divRowAddTool position
                                        return;
                                    }
                                }
                            }
                        }
                    }

                    return;
                }

                //others (12 columns grid)
                var rowClass = plugin.settings.row; //row
                var colClass = plugin.settings.cols; //['col s1', 'col s2', 'col s3', 'col s4', 'col s5', 'col s6', 'col s7', 'col s8', 'col s9', 'col s10', 'col s11', 'col s12']
                if(rowClass!='' && colClass.length>0){

                    if (!$block.hasClass(colClass[11])) {//if not column full

                        if($block.hasClass(colClass[0])){
                            return;
                        }
                        if($blocknext.hasClass(colClass[11])){
                            return;
                        }

                        if($block.hasClass(colClass[11])){
                            $block.removeClass(colClass[11]);
                            $block.addClass(colClass[10]);

                        } else if($block.hasClass(colClass[10])){
                            $block.removeClass(colClass[10]);
                            $block.addClass(colClass[9]);

                        } else if($block.hasClass(colClass[9])){
                            $block.removeClass(colClass[9]);
                            $block.addClass(colClass[8]);

                        } else if($block.hasClass(colClass[8])){
                            $block.removeClass(colClass[8]);
                            $block.addClass(colClass[7]);

                        } else if($block.hasClass(colClass[7])){
                            $block.removeClass(colClass[7]);
                            $block.addClass(colClass[6]);

                        } else if($block.hasClass(colClass[6])){
                            $block.removeClass(colClass[6]);
                            $block.addClass(colClass[5]);

                        } else if($block.hasClass(colClass[5])){
                            $block.removeClass(colClass[5]);
                            $block.addClass(colClass[4]);

                        } else if($block.hasClass(colClass[4])){
                            $block.removeClass(colClass[4]);
                            $block.addClass(colClass[3]);

                        } else if($block.hasClass(colClass[3])){
                            $block.removeClass(colClass[3]);
                            $block.addClass(colClass[2]);

                        } else if($block.hasClass(colClass[2])){
                            $block.removeClass(colClass[2]);
                            $block.addClass(colClass[1]);

                        } else if($block.hasClass(colClass[1])){
                            $block.removeClass(colClass[1]);
                            $block.addClass(colClass[0]);

                        }


                        if($blocknext.hasClass(colClass[0])){
                            $blocknext.removeClass(colClass[0]);
                            $blocknext.addClass(colClass[1]);

                        } else if($blocknext.hasClass(colClass[1])){
                            $blocknext.removeClass(colClass[1]);
                            $blocknext.addClass(colClass[2]);

                        } else if($blocknext.hasClass(colClass[2])){
                            $blocknext.removeClass(colClass[2]);
                            $blocknext.addClass(colClass[3]);

                        } else if($blocknext.hasClass(colClass[3])){
                            $blocknext.removeClass(colClass[3]);
                            $blocknext.addClass(colClass[4]);

                        } else if($blocknext.hasClass(colClass[4])){
                            $blocknext.removeClass(colClass[4]);
                            $blocknext.addClass(colClass[5]);

                        } else if($blocknext.hasClass(colClass[5])){
                            $blocknext.removeClass(colClass[5]);
                            $blocknext.addClass(colClass[6]);

                        } else if($blocknext.hasClass(colClass[6])){
                            $blocknext.removeClass(colClass[6]);
                            $blocknext.addClass(colClass[7]);

                        } else if($blocknext.hasClass(colClass[7])){
                            $blocknext.removeClass(colClass[7]);
                            $blocknext.addClass(colClass[8]);

                        } else if($blocknext.hasClass(colClass[8])){
                            $blocknext.removeClass(colClass[8]);
                            $blocknext.addClass(colClass[9]);

                        } else if($blocknext.hasClass(colClass[9])){
                            $blocknext.removeClass(colClass[9]);
                            $blocknext.addClass(colClass[10]);

                        } else if($blocknext.hasClass(colClass[10])){
                            $blocknext.removeClass(colClass[10]);
                            $blocknext.addClass(colClass[11]);

                        }

                        plugin.renderRowAddTool(); //needed to update divRowAddTool position
                    }
                }

            });

            jQuery('.cell-increase').off('click');
            jQuery('.cell-increase').on('click', function (e) {
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                var $blocknext = $block.next().not('.is-row-tool');
                if($blocknext.length==0) {
                    $blocknext = $block.prev().not('.is-row-tool');
                    if($blocknext.length==0) return;
                    var $blocknext2 = $blocknext.prev().not('.is-row-tool');
                } else {
                    var $blocknext2 = $blocknext.next().not('.is-row-tool');
                    if($blocknext2.length==0) $blocknext2 = $block.prev().not('.is-row-tool');
                }

                var rowClass = plugin.settings.row;
                var colClass = plugin.settings.cols;
                var colSizes = plugin.settings.colsizes;
                if(rowClass!='' && colClass.length> 0 && colSizes.length>0){

                    if($blocknext2.length>0){
                        for (var i = 0; i < colSizes.length; i++) {
                            var group = colSizes[i];
                            for (var j = 0; j < group.length; j++) {

                                if(group[j].length == 3){

                                    if($block.hasClass(group[j][0]) && $blocknext.hasClass(group[j][1]) && $blocknext2.hasClass(group[j][2])) {
                                        if(j+1==group.length){
                                            //cannot be increased
                                        } else {
                                            $block.removeClass(group[j][0]);
                                            $blocknext.removeClass(group[j][1]);
                                            $blocknext2.removeClass(group[j][2]);
                                            $block.addClass(group[j+1][0]);
                                            $blocknext.addClass(group[j+1][1]);
                                            $blocknext2.addClass(group[j+1][2]);

                                            plugin.renderRowAddTool(); //needed to update divRowAddTool position
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                    }

                    for (var i = 0; i < colSizes.length; i++) {
                        var group = colSizes[i];
                        for (var j = 0; j < group.length; j++) {

                            if(group[j].length == 2){

                                if($block.hasClass(group[j][0]) && $blocknext.hasClass(group[j][1])) {
                                    if(j+1==group.length){
                                        //cannot be increased
                                    } else {
                                        $block.removeClass(group[j][0]);
                                        $blocknext.removeClass(group[j][1]);
                                        $block.addClass(group[j+1][0]);
                                        $blocknext.addClass(group[j+1][1]);

                                        plugin.renderRowAddTool(); //needed to update divRowAddTool position
                                        return;
                                    }
                                }
                            }
                        }
                    }

                    return;
                }

                //others (12 columns grid)
                var rowClass = plugin.settings.row; //row
                var colClass = plugin.settings.cols; //['col s1', 'col s2', 'col s3', 'col s4', 'col s5', 'col s6', 'col s7', 'col s8', 'col s9', 'col s10', 'col s11', 'col s12']
                if(rowClass!='' && colClass.length>0){

                    if (!$block.hasClass(colClass[11])) {//if not column full

                        if($block.hasClass(colClass[11])){
                            return;
                        }
                        if($blocknext.hasClass(colClass[0])){
                            return;
                        }

                        if($block.hasClass(colClass[10])){
                            $block.removeClass(colClass[10]);
                            $block.addClass(colClass[11]);

                        } else if($block.hasClass(colClass[9])){
                            $block.removeClass(colClass[9]);
                            $block.addClass(colClass[10]);

                        } else if($block.hasClass(colClass[8])){
                            $block.removeClass(colClass[8]);
                            $block.addClass(colClass[9]);

                        } else if($block.hasClass(colClass[7])){
                            $block.removeClass(colClass[7]);
                            $block.addClass(colClass[8]);

                        } else if($block.hasClass(colClass[6])){
                            $block.removeClass(colClass[6]);
                            $block.addClass(colClass[7]);

                        } else if($block.hasClass(colClass[5])){
                            $block.removeClass(colClass[5]);
                            $block.addClass(colClass[6]);

                        } else if($block.hasClass(colClass[4])){
                            $block.removeClass(colClass[4]);
                            $block.addClass(colClass[5]);

                        } else if($block.hasClass(colClass[3])){
                            $block.removeClass(colClass[3]);
                            $block.addClass(colClass[4]);

                        } else if($block.hasClass(colClass[2])){
                            $block.removeClass(colClass[2]);
                            $block.addClass(colClass[3]);

                        } else if($block.hasClass(colClass[1])){
                            $block.removeClass(colClass[1]);
                            $block.addClass(colClass[2]);

                        } else if($block.hasClass(colClass[0])){
                            $block.removeClass(colClass[0]);
                            $block.addClass(colClass[1]);
                        }


                        if($blocknext.hasClass(colClass[1])){
                            $blocknext.removeClass(colClass[1]);
                            $blocknext.addClass(colClass[0]);

                        } else if($blocknext.hasClass(colClass[2])){
                            $blocknext.removeClass(colClass[2]);
                            $blocknext.addClass(colClass[1]);

                        } else if($blocknext.hasClass(colClass[3])){
                            $blocknext.removeClass(colClass[3]);
                            $blocknext.addClass(colClass[2]);

                        } else if($blocknext.hasClass(colClass[4])){
                            $blocknext.removeClass(colClass[4]);
                            $blocknext.addClass(colClass[3]);

                        } else if($blocknext.hasClass(colClass[5])){
                            $blocknext.removeClass(colClass[5]);
                            $blocknext.addClass(colClass[4]);

                        } else if($blocknext.hasClass(colClass[6])){
                            $blocknext.removeClass(colClass[6]);
                            $blocknext.addClass(colClass[5]);

                        } else if($blocknext.hasClass(colClass[7])){
                            $blocknext.removeClass(colClass[7]);
                            $blocknext.addClass(colClass[6]);

                        } else if($blocknext.hasClass(colClass[8])){
                            $blocknext.removeClass(colClass[8]);
                            $blocknext.addClass(colClass[7]);

                        } else if($blocknext.hasClass(colClass[9])){
                            $blocknext.removeClass(colClass[9]);
                            $blocknext.addClass(colClass[8]);

                        } else if($blocknext.hasClass(colClass[10])){
                            $blocknext.removeClass(colClass[10]);
                            $blocknext.addClass(colClass[9]);

                        } else if($blocknext.hasClass(colClass[11])){
                            $blocknext.removeClass(colClass[11]);
                            $blocknext.addClass(colClass[10]);

                        }

                        plugin.renderRowAddTool(); //needed to update divRowAddTool position

                    }
                }

            });


            //ROW

            jQuery('#divRowAddTool button').off('click');
            jQuery('#divRowAddTool button').on('click', function () {

                /*jQuery('#divRowAddTool').css('height','40px');
                jQuery('#divRowAddTool').css('background','rgba(200, 200, 200, 0.2)');
                var $block = jQuery("#divCellTool").data('active');
                var $row = $block.parent();
                $row.next().css('margin-top','40px');*/
;
                jQuery(".cell-add-options").data('mode', 'row');

                var _width = jQuery(".cell-add-options").width();
                var _height = jQuery(".cell-add-options").height();

                if(parseInt(jQuery('#divRowAddTool button').css('left'))<0) { //if negative => button on left
                    var _top = jQuery(this).offset().top - _height + 22;
                    var _left = jQuery(this).offset().left + 40;
                    jQuery(".cell-add-options").css("top", _top + "px");
                    jQuery(".cell-add-options").css("left", _left + "px");
                    jQuery(".cell-add-options").removeClass("arrow-top");
                    jQuery(".cell-add-options").removeClass("arrow-right");
                    jQuery(".cell-add-options").removeClass("arrow-bottom");
                    jQuery(".cell-add-options").removeClass("center");
                    jQuery(".cell-add-options").addClass("arrow-left");
                    jQuery(".cell-add-options").addClass("bottom");
                } else {

                    var _topFromWindow = jQuery('#divRowAddTool').offset().top - $(window).scrollTop();
                    if(_topFromWindow < _height + 30) {
                        var _top = jQuery(this).offset().top + 32;
                        var _left = jQuery(this).offset().left - (_width/2);
                        if(bIsAppleMobile) { //adjustment because the button is set bigger (see renderLayoutTool())
                            _left=_left+2;
                            _top=_top+7;
                        }
                        jQuery(".cell-add-options").css("top", _top + "px");
                        jQuery(".cell-add-options").css("left", _left + "px");
                        jQuery(".cell-add-options").removeClass("arrow-bottom");
                        jQuery(".cell-add-options").removeClass("arrow-right");
                        jQuery(".cell-add-options").removeClass("arrow-left");
                        jQuery(".cell-add-options").removeClass("center");
                        jQuery(".cell-add-options").addClass("arrow-top");
                        jQuery(".cell-add-options").addClass("center");
                    } else {
                        var _top = jQuery(this).offset().top - _height -26;
                        var _left = jQuery(this).offset().left - (_width/2);
                        if(bIsAppleMobile) { //adjustment because the button is set bigger (see renderLayoutTool())
                            _left=_left+2;
                        }
                        jQuery(".cell-add-options").css("top", _top + "px");
                        jQuery(".cell-add-options").css("left", _left + "px");
                        jQuery(".cell-add-options").removeClass("arrow-top");
                        jQuery(".cell-add-options").removeClass("arrow-right");
                        jQuery(".cell-add-options").removeClass("arrow-left");
                        jQuery(".cell-add-options").removeClass("center");
                        jQuery(".cell-add-options").addClass("arrow-bottom");
                        jQuery(".cell-add-options").addClass("center");
                    }
                }

                var _screenwidth = jQuery(window).width();
                if(_screenwidth <= 640) {
                    jQuery(".cell-add-options").css("display", "flex");
                } else {
                    jQuery(".cell-add-options").css("display",  "block");
                }
                jQuery('.cell-add-options .is-pop-close').off('click');
                jQuery('.cell-add-options .is-pop-close').on('click', function (e) {
                    jQuery(".cell-add-options").css("display", "none");
                });

            });


            //ELEMENT

            jQuery('.element-up').off('click');
            jQuery('.element-up').on('click', function () {

                var $el = jQuery("#divElementTool").data('active');

                if ($el.prev().length == 0) {
                    //If there is no previous element, consider moving the parent
                    var attr = $el.parent().attr('contenteditable');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        //parent is cell (button should have already been hidden)
                    } else {

                        //Save for Undo
                        plugin.saveForUndo();

                        //parent is another element (still inside cell)
                        $el.parent().prev().insertAfter($el.parent());
                    }
                } else {

                    //Save for Undo
                    plugin.saveForUndo();

                    //Any level
                    $el.prev().insertAfter($el);
                }

                //Hide tools (except element tool)
                plugin.hideElementTools();
                jQuery('#divElementTool').css('display', 'block');

                //Element tool
                plugin.renderElementTool();

                //Trigger Change event
                plugin.settings.onChange();
            });

            jQuery('.element-down').off('click');
            jQuery('.element-down').on('click', function () {

                var $el = jQuery("#divElementTool").data('active');

                if ($el.next().length == 0) {
                    //If there is no next element, consider moving the parent
                    var attr = $el.parent().attr('contenteditable');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        //parent is cell (button should have already been hidden)
                    } else {

                        //Save for Undo
                        plugin.saveForUndo();

                        //parent is another element (still inside cell)
                        $el.parent().next().insertBefore($el.parent());
                    }

                } else {

                    //Save for Undo
                    plugin.saveForUndo();

                    //Any level
                    $el.next().insertBefore($el);
                }

                //Hide tools (except element tool)
                plugin.hideElementTools();
                jQuery('#divElementTool').css('display', 'block');

                //Element tool
                plugin.renderElementTool();

                //Trigger Change event
                plugin.settings.onChange();
            });

            jQuery('.element-remove').off('click');
            jQuery('.element-remove').on('click', function () {

                var $el = jQuery("#divElementTool").data('active');
                var $block = jQuery("#divCellTool").data('active');
                var $row = $block.parent();

                //show modal
                var $modal = jQuery('.is-modal.delconfirm');
                plugin.showModal($modal, false, true);

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var attr = $el.parent().attr('contenteditable');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        //parent is cell
                        $el.remove();
                    } else {
                        //parent is another element (still inside cell)
                        if ($el.parent().children().length == 1) {
                            $el.parent().remove();
                        } else {
                            $el.remove();
                        }
                    }

                    if ($block.children().length == 0) {
                        //Del cell

                        if ($row.children().not('.is-row-tool').length == 1) {

                            $row.remove();

                            plugin.checkEmpty();

                        } else {
                            $block.remove();

                            plugin.checkEmpty();

                            //fix layout
                            plugin.fixLayout($row);
                        }
                    }

                    //Hide tools
                    plugin.hideElementTools();
                    jQuery('#divCellTool').css('display', 'none');
                    jQuery('#divRowAddTool').css('display', 'none');
                    jQuery(".is-row-tool").css("display", "");
                    jQuery('.row-active').removeClass('row-active');
                    jQuery('.row-outline').removeClass('row-outline');
                    jQuery('.cell-active').removeClass('cell-active');

                    plugin.hideModal($modal);

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.updateContentEditable($block);
                });

            });

            jQuery('.element-duplicate').off('click');
            jQuery('.element-duplicate').on('click', function () {

                //Save for Undo
                plugin.saveForUndo();

                $elm = jQuery('#divElementTool').data('active');

                $elm.clone().insertBefore($elm).removeClass('elm-active');

                plugin.restoreSelection();

                plugin.applyBehavior();

                plugin.renderLayoutTool();

                //Trigger Change event
                plugin.settings.onChange();

                //Trigger Render event
                plugin.settings.onRender();

            });

            jQuery('.element-add').off('click');
            jQuery('.element-add').on('click', function () {

                jQuery(".cell-add-options").data('mode', 'elm');

                var _halfscreenheight = jQuery(window).height()/2;
                var _clickpos = jQuery(this).offset().top - jQuery(document).scrollTop();

                var _width = jQuery(".cell-add-options").width();

                if (_clickpos > _halfscreenheight) {
                    var _height = jQuery(".cell-add-options").outerHeight();
                    var _top = jQuery(this).offset().top - _height - 10;
                    var _left = jQuery(this).offset().left - (_width/2) + 5;
                    jQuery(".cell-add-options").css("top", _top + "px");
                    jQuery(".cell-add-options").css("left", _left + "px");
                    jQuery(".cell-add-options").css("display", "block");
                    jQuery(".cell-add-options").removeClass("arrow-top");
                    jQuery(".cell-add-options").removeClass("arrow-right");
                    jQuery(".cell-add-options").removeClass("arrow-left");
                    //jQuery(".cell-add-options").removeClass("center");
                    jQuery(".cell-add-options").addClass("arrow-bottom");
                    jQuery(".cell-add-options").addClass("center");
                } else {
                    var _top = jQuery(this).offset().top + 35;
                    var _left = jQuery(this).offset().left - (_width/2) + 5;
                    jQuery(".cell-add-options").css("top", _top + "px");
                    jQuery(".cell-add-options").css("left", _left + "px");
                    jQuery(".cell-add-options").css("display", "block");
                    jQuery(".cell-add-options").removeClass("arrow-bottom");
                    jQuery(".cell-add-options").removeClass("arrow-right");
                    jQuery(".cell-add-options").removeClass("arrow-left");
                    jQuery(".cell-add-options").addClass("arrow-top");
                    jQuery(".cell-add-options").addClass("center");
                }

                var _screenwidth = jQuery(window).width();
                if(_screenwidth <= 640) {
                    jQuery(".cell-add-options").css("display", "flex");
                } else {
                    jQuery(".cell-add-options").css("display",  "block");
                }
                jQuery('.cell-add-options .is-pop-close').off('click');
                jQuery('.cell-add-options .is-pop-close').on('click', function (e) {
                    jQuery(".cell-add-options").css("display", "none");
                });
            });

            jQuery('#tabElementMore').off('click');
            jQuery('#tabElementMore').on('click', function (e) {
                jQuery('#divElementMore').css('display', 'block');
                return false;
            });

            jQuery('.element-edit').off('click');
            jQuery('.element-edit').on('click', function (e) {

                var $elm_inspected = jQuery('#divElementTool').data('active-inspected');

                jQuery('[data-saveforundo]').removeAttr('data-saveforundo');
                $elm_inspected.attr('data-saveforundo','');

                jQuery('.elm-list').html('');

                //Background Color
                jQuery('.input-elm-bgcolor').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('background-color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });

                //Text Color
                jQuery('.input-elm-color').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });

                //Shadow Color
                jQuery('.input-elm-shadowcolor').colorpicker({
                    color: '',
                    onPick: function (color) {

                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');

                            var shadowColor = color;
                            var shadowInset = jQuery('#inpElmBoxShadowInset').val();

                            var val = jQuery('#inpElmBoxShadowX').val();
                            var unit = jQuery('#inpElmBoxShadowXUnit').val();
                            var offX = '';
                            if(!isNaN(val) && val!='') {
                                offX = val + unit;
                            }

                            val = jQuery('#inpElmBoxShadowY').val();
                            unit = jQuery('#inpElmBoxShadowYUnit').val();
                            var offY = '';
                            if(!isNaN(val) && val!='') {
                                offY = val + unit;
                            }

                            val = jQuery('#inpElmBoxShadowBlur').val();
                            unit = jQuery('#inpElmBoxShadowBlurUnit').val();
                            var blur = '';
                            if(!isNaN(val) && val!='') {
                                blur = val + unit;
                            }

                            val = jQuery('#inpElmBoxShadowSpread').val();
                            unit = jQuery('#inpElmBoxShadowSpreadUnit').val();
                            var spread = '';
                            if(!isNaN(val) && val!='') {
                                spread = val + unit;
                            }

                            $elm.css('box-shadow', offX + ' ' + offY + ' ' + blur + ' ' + spread + ' ' + shadowColor + ' ' + shadowInset);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });

                //Border Color
                jQuery('.input-elm-bordercolor').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('border-color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });
                jQuery('.input-elm-bordertopcolor').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('border-top-color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });
                jQuery('.input-elm-borderbottomcolor').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('border-bottom-color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });
                jQuery('.input-elm-borderleftcolor').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('border-left-color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });
                jQuery('.input-elm-borderrightcolor').colorpicker({
                    color: '',
                    onPick: function (color) {
                        if(jQuery('.elm-list > a.active').length>0){

                            //Save for Undo
                            plugin.saveForUndo();

                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css('border-right-color',color);

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }
                    }
                });

                while (!$elm_inspected.hasClass('is-builder')) {

                    var tagname = $elm_inspected.prop("tagName").toLowerCase();

                    var $elm = jQuery('<a>');
                    if(plugin.settings.emailMode){
                        var $elm = jQuery('<a style="font-size:16px;line-height:1.2;color:#d38100">');
                    }
                    $elm.data('elm', $elm_inspected);
                    $elm.attr('href','#');
                    $elm.html(tagname);

                    if(jQuery('.elm-list').html()==''){
                        $elm.addClass('active');
                        jQuery('.elm-list').prepend($elm);
                    } else {
                        jQuery('.elm-list').prepend('&nbsp;>&nbsp; ');
                        jQuery('.elm-list').prepend($elm);
                    }


                    $elm_inspected = jQuery($elm_inspected.parent());

                    $elm.on('click', function(){

                        //Read styles (every element click)

                        jQuery('.elm-list > a').removeClass('active');
                        jQuery(this).addClass('active');
                        var $elm_selected = jQuery(this).data('elm');
                        jQuery('.elm-inspected').removeClass('elm-inspected');
                        $elm_selected.addClass('elm-inspected');

                        jQuery('[data-saveforundo]').removeAttr('data-saveforundo');
                        $elm_selected.attr('data-saveforundo', '');

                        jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);

                        //background color
                        var s = $elm_selected.get(0).style.backgroundColor;
                        jQuery('.input-elm-bgcolor').data('colorpicker').setColor(s);

                        //text color
                        var s = $elm_selected.get(0).style.color;
                        jQuery('.input-elm-color').data('colorpicker').setColor(s);

                        //border color
                        var s = $elm_selected.get(0).style.borderColor;
                        jQuery('.input-elm-bordercolor').data('colorpicker').setColor(s);
                        var s = $elm_selected.get(0).style.borderTopColor;
                        jQuery('.input-elm-bordertopcolor').data('colorpicker').setColor(s);
                        var s = $elm_selected.get(0).style.borderBottomColor;
                        jQuery('.input-elm-borderbottomcolor').data('colorpicker').setColor(s);
                        var s = $elm_selected.get(0).style.borderLeftColor;
                        jQuery('.input-elm-borderleftcolor').data('colorpicker').setColor(s);
                        var s = $elm_selected.get(0).style.borderRightColor;
                        jQuery('.input-elm-borderrightcolor').data('colorpicker').setColor(s);

                        jQuery('#inpElmMaxWidth').val('');
                        jQuery('#inpElmMaxWidthUnit').val('px');
                        var s = $elm_selected.get(0).style.maxWidth;
                        var nMaxWidth = parseInt(s);
                        if(!isNaN(nMaxWidth)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMaxWidthUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMaxWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMaxWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMaxWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMaxWidthUnit').val('em');
                            }
                            jQuery('#inpElmMaxWidth').val(nMaxWidth);
                        }

                        jQuery('#inpElmMaxHeight').val('');
                        jQuery('#inpElmMaxHeightUnit').val('px');
                        var s = $elm_selected.get(0).style.maxHeight;
                        var nMaxHeight = parseInt(s);
                        if(!isNaN(nMaxHeight)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMaxHeightUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMaxHeightUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMaxHeightUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMaxHeightUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMaxHeightUnit').val('em');
                            }
                            jQuery('#inpElmMaxHeight').val(nMaxHeight);
                        }

                        jQuery('#inpElmMinWidth').val('');
                        jQuery('#inpElmMinWidthUnit').val('px');
                        var s = $elm_selected.get(0).style.minWidth;
                        var nMinWidth = parseInt(s);
                        if(!isNaN(nMinWidth)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMinWidthUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMinWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMinWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMinWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMinWidthUnit').val('em');
                            }
                            jQuery('#inpElmMinWidth').val(nMinWidth);
                        }

                        jQuery('#inpElmMinHeight').val('');
                        jQuery('#inpElmMinHeightUnit').val('px');
                        var s = $elm_selected.get(0).style.minHeight;
                        var nMinHeight = parseInt(s);
                        if(!isNaN(nMinHeight)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMinHeightUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMinHeightUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMinHeightUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMinHeightUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMinHeightUnit').val('em');
                            }
                            jQuery('#inpElmMinHeight').val(nMinHeight);
                        }

                        jQuery('#inpElmWidth').val('');
                        jQuery('#inpElmWidthUnit').val('px');
                        var s = $elm_selected.get(0).style.width;
                        var nWidth = parseInt(s);
                        if(!isNaN(nWidth)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmWidthUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmWidthUnit').val('em');
                            }
                            jQuery('#inpElmWidth').val(nWidth);
                        }

                        jQuery('#inpElmHeight').val('');
                        jQuery('#inpElmHeightUnit').val('px');
                        var s = $elm_selected.get(0).style.height;
                        var nHeight = parseInt(s);
                        if(!isNaN(nHeight)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmHeightUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmHeightUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmHeightUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmHeightUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmHeightUnit').val('em');
                            }
                            jQuery('#inpElmHeight').val(nHeight);
                        }

                        jQuery('#inpElmOverflowX').val('');
                        var s = $elm_selected.get(0).style.overflowX;
                        if(jQuery('#inpElmOverflowX option[value="'+s+'"]').length>0) {
                            jQuery('#inpElmOverflowX').val(s);
                        }

                        jQuery('#inpElmOverflowY').val('');
                        var s = $elm_selected.get(0).style.overflowY;
                        if(jQuery('#inpElmOverflowY option[value="'+s+'"]').length>0) {
                            jQuery('#inpElmOverflowY').val(s);
                        }

                        jQuery('#inpElmMarginLeft').val('');
                        var nMarginLeft = parseInt($elm_selected.get(0).style.marginLeft);
                        if(!isNaN(nMarginLeft)) {
                            jQuery('#inpElmMarginLeft').val(nMarginLeft);
                        }

                        jQuery('#inpElmMarginRight').val('');
                        var nMarginRight = parseInt($elm_selected.get(0).style.marginRight);
                        if(!isNaN(nMarginRight)) {
                            jQuery('#inpElmMarginRight').val(nMarginRight);
                        }

                        if($elm_selected.hasClass('margin-left-1024-reset')){
                            jQuery("#chkResetMarginLeft").prop("checked", true);
                        } else {
                            jQuery("#chkResetMarginLeft").prop("checked", false);
                        }

                        if($elm_selected.hasClass('margin-right-1024-reset')){
                            jQuery("#chkResetMarginRight").prop("checked", true);
                        } else {
                            jQuery("#chkResetMarginRight").prop("checked", false);
                        }

                        jQuery('#inpElmMarginTop').val('');
                        var nMarginTop = parseInt($elm_selected.get(0).style.marginTop);
                        if(!isNaN(nMarginTop)) {
                            jQuery('#inpElmMarginTop').val(nMarginTop);
                        }

                        jQuery('#inpElmMarginBottom').val('');
                        var nMarginBottom = parseInt($elm_selected.get(0).style.marginBottom);
                        if(!isNaN(nMarginBottom)) {
                            jQuery('#inpElmMarginBottom').val(nMarginBottom);
                        }

                        jQuery('#inpElmPaddingLeft').val('');
                        var nPaddingLeft = parseInt($elm_selected.get(0).style.paddingLeft);
                        if(!isNaN(nPaddingLeft)) {
                            jQuery('#inpElmPaddingLeft').val(nPaddingLeft);
                        }

                        jQuery('#inpElmPaddingRight').val('');
                        var nPaddingRight = parseInt($elm_selected.get(0).style.paddingRight);
                        if(!isNaN(nPaddingRight)) {
                            jQuery('#inpElmPaddingRight').val(nPaddingRight);
                        }

                        jQuery('#inpElmPaddingTop').val('');
                        var nPaddingTop = parseInt($elm_selected.get(0).style.paddingTop);
                        if(!isNaN(nPaddingTop)) {
                            jQuery('#inpElmPaddingTop').val(nPaddingTop);
                        }

                        jQuery('#inpElmPaddingBottom').val('');
                        var nPaddingBottom = parseInt($elm_selected.get(0).style.paddingBottom);
                        if(!isNaN(nPaddingBottom)) {
                            jQuery('#inpElmPaddingBottom').val(nPaddingBottom);
                        }

                        jQuery('#inpElmBorderWidth').val('');
                        jQuery('#inpElmBorderWidthUnit').val('');
                        jQuery('#inpElmBorderStyle').val('');
                        var s = $elm_selected.get(0).style.borderWidth;
                        var nBorderWidth = parseInt(s);
                        if(!isNaN(nBorderWidth)) {
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmBorderWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmBorderWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmBorderWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmBorderWidthUnit').val('em');
                            }

                            jQuery('#inpElmBorderWidth').val(nBorderWidth);

                            if(s.indexOf('solid')!=-1){
                                jQuery('#inpElmBorderStyle').val('solid');
                            }
                            if(s.indexOf('dashed')!=-1){
                                jQuery('#inpElmBorderStyle').val('dashed');
                            }
                            if(s.indexOf('dotted')!=-1){
                                jQuery('#inpElmBorderStyle').val('dotted');
                            }
                        } else {
                            var s = $elm_selected.get(0).style.border;
                            if(s.indexOf('none')!=-1){
                                jQuery('#inpElmBorderWidthUnit').val('none');
                                jQuery('#inpElmBorderWidth').val('');
                                jQuery('#inpElmBorderStyle').val('');
                            }
                        }

                        jQuery('#inpElmBorderRadius').val('');
                        var nBorderRadius = parseInt($elm_selected.get(0).style.borderRadius);
                        if(!isNaN(nBorderRadius)) {
                            jQuery('#inpElmBorderRadius').val(nBorderRadius);
                        }

                        jQuery('#inpElmBorderTopLeftRadius').val('');
                        var nBorderRadius = parseInt($elm_selected.get(0).style.borderTopLeftRadius);
                        if(!isNaN(nBorderRadius)) {
                            jQuery('#inpElmBorderTopLeftRadius').val(nBorderRadius);
                        }

                        jQuery('#inpElmBorderTopRightRadius').val('');
                        var nBorderRadius = parseInt($elm_selected.get(0).style.borderTopRightRadius);
                        if(!isNaN(nBorderRadius)) {
                            jQuery('#inpElmBorderTopRightRadius').val(nBorderRadius);
                        }

                        jQuery('#inpElmBorderBottomLeftRadius').val('');
                        var nBorderRadius = parseInt($elm_selected.get(0).style.borderBottomLeftRadius);
                        if(!isNaN(nBorderRadius)) {
                            jQuery('#inpElmBorderBottomLeftRadius').val(nBorderRadius);
                        }

                        jQuery('#inpElmBorderBottomRightRadius').val('');
                        var nBorderRadius = parseInt($elm_selected.get(0).style.borderBottomRightRadius);
                        if(!isNaN(nBorderRadius)) {
                            jQuery('#inpElmBorderBottomRightRadius').val(nBorderRadius);
                        }

                        jQuery('#inpElmBorderStyle').val('');
                        var sBorderStyle = $elm_selected.get(0).style.borderStyle;
                        if(jQuery('#inpElmBorderStyle option[value="'+sBorderStyle+'"]').length>0) {
                            jQuery('#inpElmBorderStyle').val(sBorderStyle);
                        }

                        var sBoxShadow = $elm_selected.get(0).style.boxShadow;
                        jQuery('#inpElmBoxShadowX').val('');
                        jQuery('#inpElmBoxShadowY').val('');
                        jQuery('#inpElmBoxShadowBlur').val('');
                        jQuery('#inpElmBoxShadowSpread').val('');
                        jQuery('#inpElmBoxShadowInset').val('');
                        jQuery('#inpElmBoxShadowXUnit').val('px');
                        jQuery('#inpElmBoxShadowYUnit').val('px');
                        jQuery('#inpElmBoxShadowBlurUnit').val('px');
                        jQuery('#inpElmBoxShadowSpreadUnit').val('px');
                        if(sBoxShadow.indexOf('inset')!=-1){
                            jQuery('#inpElmBoxShadowInset').val('inset');
                            sBoxShadow=sBoxShadow.replace('inset','');
                        }
                        if(sBoxShadow!=''){
                            if(sBoxShadow.indexOf('rgb')!=-1){ //always get rgb value, not hex
                                var color = sBoxShadow.substr(sBoxShadow.indexOf('rgb'));
                                color = color.substr(0,color.indexOf(')')+1);
                                jQuery('.input-elm-shadowcolor').data('colorpicker').setColor(color);

                                var n = sBoxShadow.split("rgb")[1].indexOf(')');
                                sBoxShadow = sBoxShadow.split("rgb")[0] + sBoxShadow.split("rgb")[1].substr(n+2);
                            }
                            if(sBoxShadow.indexOf('#')!=-1){ //never executed
                                var color = sBoxShadow.substr(sBoxShadow.indexOf('#'));
                                color = color.substr(0,color.indexOf(' '));
                                jQuery('.input-elm-shadowcolor').data('colorpicker').setColor(color);

                                var n = sBoxShadow.split("#")[1].indexOf(' ');
                                sBoxShadow = sBoxShadow.split("#")[0] + sBoxShadow.split("#")[1].substr(n+2);
                            }
                            var array= sBoxShadow.split(" ");
                            var length = array.length;
                            var n=1;
                            for (var i=0; i<length; i++) {
                                if(n==1){
                                    jQuery('#inpElmBoxShadowX').val(parseInt(array[i]));
                                    if(array[i].indexOf('px')!=-1){
                                        jQuery('#inpElmBoxShadowXUnit').val('px');
                                    } else if (array[i].indexOf('em')!=-1) {
                                        jQuery('#inpElmBoxShadowXUnit').val('em');
                                    } else {
                                        jQuery('#inpElmBoxShadowX').val('');
                                    }
                                }
                                if(n==2){
                                    jQuery('#inpElmBoxShadowY').val(parseInt(array[i]));
                                    if(array[i].indexOf('px')!=-1){
                                        jQuery('#inpElmBoxShadowYUnit').val('px');
                                    } else if (array[i].indexOf('em')!=-1) {
                                        jQuery('#inpElmBoxShadowYUnit').val('em');
                                    } else {
                                        jQuery('#inpElmBoxShadowY').val('');
                                    }
                                }
                                if(n==3){
                                    jQuery('#inpElmBoxShadowBlur').val(parseInt(array[i]));
                                    if(array[i].indexOf('px')!=-1){
                                        jQuery('#inpElmBoxShadowBlurUnit').val('px');
                                    } else if (array[i].indexOf('em')!=-1) {
                                        jQuery('#inpElmBoxShadowBlurUnit').val('em');
                                    } else {
                                        jQuery('#inpElmBoxShadowBlur').val('');
                                    }
                                }
                                if(n==4){
                                    jQuery('#inpElmBoxShadowSpread').val(parseInt(array[i]));
                                    if(array[i].indexOf('px')!=-1){
                                        jQuery('#inpElmBoxShadowSpreadUnit').val('px');
                                    } else if (array[i].indexOf('em')!=-1) {
                                        jQuery('#inpElmBoxShadowSpreadUnit').val('em');
                                    } else {
                                        jQuery('#inpElmBoxShadowSpread').val('');
                                    }
                                }
                                n++;
                            }
                        }

                        /*
                            Text Style
                            by Tinara
                        */
                        jQuery('#inpElmTextAlign').val('');
                        var sTextAlign = $elm_selected.get(0).style.textAlign;
                        if(jQuery('#inpElmTextAlign option[value="'+sTextAlign+'"]').length>0) {
                            jQuery('#inpElmTextAlign').val(sTextAlign);
                        }

                        jQuery('#inpElmFontSize').val('');
                        var nFontSize = parseInt($elm_selected.get(0).style.fontSize);
                        if(!isNaN(nFontSize)) {
                            jQuery('#inpElmFontSize').val(nFontSize);
                        }

                        jQuery('#inpElmFontSizeUnit').val('px');
                        var s = $elm_selected.get(0).style.fontSize;
                        if(s.indexOf('px')!=-1){
                            var sFontSizeUnit ='px';
                        }
                        if(s.indexOf('pt')!=-1){
                            var sFontSizeUnit ='pt';
                        }
                        if(s.indexOf('em')!=-1){
                            var sFontSizeUnit ='em';
                        }
                        if(s.indexOf('vw')!=-1){
                            var sFontSizeUnit ='vw';
                        }
                        if(s.indexOf('vh')!=-1){
                            var sFontSizeUnit ='vh';
                        }
                        if(s.indexOf('%')!=-1){
                            var sFontSizeUnit ='%';
                        }
                        if(jQuery('#inpElmFontSizeUnit option[value="'+sFontSizeUnit+'"]').length>0) {
                            jQuery('#inpElmFontSizeUnit').val(sFontSizeUnit);
                        }

                        jQuery('#inpElmFontWeight').val('');
                        var sFontWeight = $elm_selected.get(0).style.fontWeight;
                        if(jQuery('#inpElmFontWeight option[value="'+sFontWeight+'"]').length>0) {
                            jQuery('#inpElmFontWeight').val(sFontWeight);
                        }

                        jQuery('#inpElmFontStyle').val('');
                        var sFontStyle = $elm_selected.get(0).style.fontStyle;
                        if(jQuery('#inpElmFontStyle option[value="'+sFontStyle+'"]').length>0) {
                            jQuery('#inpElmFontStyle').val(sFontStyle);
                        }

                        jQuery('#inpElmTextTransform').val('');
                        var sTextTransform = $elm_selected.get(0).style.textTransform;
                        if(jQuery('#inpElmTextTransform option[value="'+sTextTransform+'"]').length>0) {
                            jQuery('#inpElmTextTransform').val(sTextTransform);
                        }

                        jQuery('#inpElmTextDecoration').val('');
                        var sTextDecoration = $elm_selected.get(0).style.textDecoration;
                        if(jQuery('#inpElmTextDecoration option[value="'+sTextDecoration+'"]').length>0) {
                            jQuery('#inpElmTextDecoration').val(sTextDecoration);
                        }

                        jQuery('#inpElmLineHeight').val('');
                        var nLineHeight = parseInt($elm_selected.get(0).style.lineHeight);
                        if(!isNaN(nLineHeight)) {
                            jQuery('#inpElmLineHeight').val(nLineHeight);
                        }

                        jQuery('#inpElmLineHeightUnit').val('');
                        var s = $elm_selected.get(0).style.lineHeight;
                        if(s.indexOf('px')!=-1){
                            var sLineHeightUnit ='px';
                        }
                        if(s.indexOf('pt')!=-1){
                            var sLineHeightUnit ='pt';
                        }
                        if(jQuery('#inpElmLineHeightUnit option[value="'+sLineHeightUnit+'"]').length>0) {
                            jQuery('#inpElmLineHeightUnit').val(sLineHeightUnit);
                        }

                        jQuery('#inpElmLetterSpacing').val('');
                        var nLetterSpacing = parseInt($elm_selected.get(0).style.letterSpacing);
                        if(!isNaN(nLetterSpacing)) {
                            jQuery('#inpElmLetterSpacing').val(nLetterSpacing);
                        }

                        jQuery('#inpElmWordSpacing').val('');
                        var nWordSpacing = parseInt($elm_selected.get(0).style.wordSpacing);
                        if(!isNaN(nWordSpacing)) {
                            jQuery('#inpElmWordSpacing').val(nWordSpacing);
                        }

                        jQuery('#inpElmFontFamily').val('');
                        var sFontFamily = $elm_selected.get(0).style.fontFamily;
                        if(sFontFamily!='') {
                            jQuery('#inpElmFontFamily').val(sFontFamily);
                        }

                        jQuery('#inpElmFloat').val('');
                        var sFloat = $elm_selected.get(0).style.float;
                        if(jQuery('#inpElmFloat option[value="'+sFloat+'"]').length>0) {
                            jQuery('#inpElmFloat').val(sFloat);
                        }

                        jQuery('#inpElmBorderTopWidth').val('');
                        jQuery('#inpElmBorderTopWidthUnit').val('');
                        jQuery('#inpElmBorderTopStyle').val('');
                        var s = $elm_selected.get(0).style.borderTopWidth;
                        var nBorderTopWidth = parseInt(s);
                        if(!isNaN(nBorderTopWidth)) {
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmBorderTopWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmBorderTopWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmBorderTopWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmBorderTopWidthUnit').val('em');
                            }

                            jQuery('#inpElmBorderTopWidth').val(nBorderTopWidth);

                            if(s.indexOf('solid')!=-1){
                                jQuery('#inpElmBorderTopStyle').val('solid');
                            }
                            if(s.indexOf('dashed')!=-1){
                                jQuery('#inpElmBorderTopStyle').val('dashed');
                            }
                            if(s.indexOf('dotted')!=-1){
                                jQuery('#inpElmBorderTopStyle').val('dotted');
                            }
                        } else {
                            var s = $elm_selected.get(0).style.borderTop;
                            if(s.indexOf('none')!=-1){
                                jQuery('#inpElmBorderTopWidthUnit').val('none');
                                jQuery('#inpElmBorderTopWidth').val('');
                                jQuery('#inpElmBorderTopStyle').val('');
                            }
                        }

                        jQuery('#inpElmBorderBottomWidth').val('');
                        jQuery('#inpElmBorderBottomWidthUnit').val('');
                        jQuery('#inpElmBorderBottomStyle').val('');
                        var s = $elm_selected.get(0).style.borderBottomWidth;
                        var nBorderBottomWidth = parseInt(s);
                        if(!isNaN(nBorderBottomWidth)) {
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmBorderBottomWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmBorderBottomWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmBorderBottomWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmBorderBottomWidthUnit').val('em');
                            }

                            jQuery('#inpElmBorderBottomWidth').val(nBorderBottomWidth);

                            if(s.indexOf('solid')!=-1){
                                jQuery('#inpElmBorderBottomStyle').val('solid');
                            }
                            if(s.indexOf('dashed')!=-1){
                                jQuery('#inpElmBorderBottomStyle').val('dashed');
                            }
                            if(s.indexOf('dotted')!=-1){
                                jQuery('#inpElmBorderBottomStyle').val('dotted');
                            }
                        } else {
                            var s = $elm_selected.get(0).style.borderBottom;
                            if(s.indexOf('none')!=-1){
                                jQuery('#inpElmBorderBottomWidthUnit').val('none');
                                jQuery('#inpElmBorderBottomWidth').val('');
                                jQuery('#inpElmBorderBottomStyle').val('');
                            }
                        }

                        jQuery('#inpElmBorderLeftWidth').val('');
                        jQuery('#inpElmBorderLeftWidthUnit').val('');
                        jQuery('#inpElmBorderLeftStyle').val('');
                        var s = $elm_selected.get(0).style.borderLeftWidth;
                        var nBorderLeftWidth = parseInt(s);
                        if(!isNaN(nBorderLeftWidth)) {
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmBorderLeftWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmBorderLeftWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmBorderLeftWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmBorderLeftWidthUnit').val('em');
                            }

                            jQuery('#inpElmBorderLeftWidth').val(nBorderLeftWidth);

                            if(s.indexOf('solid')!=-1){
                                jQuery('#inpElmBorderLeftStyle').val('solid');
                            }
                            if(s.indexOf('dashed')!=-1){
                                jQuery('#inpElmBorderLeftStyle').val('dashed');
                            }
                            if(s.indexOf('dotted')!=-1){
                                jQuery('#inpElmBorderLeftStyle').val('dotted');
                            }
                        } else {
                            var s = $elm_selected.get(0).style.borderLeft;
                            if(s.indexOf('none')!=-1){
                                jQuery('#inpElmBorderLeftWidthUnit').val('none');
                                jQuery('#inpElmBorderLeftWidth').val('');
                                jQuery('#inpElmBorderLeftStyle').val('');
                            }
                        }

                        jQuery('#inpElmBorderRightWidth').val('');
                        jQuery('#inpElmBorderRightWidthUnit').val('');
                        jQuery('#inpElmBorderRightStyle').val('');
                        var s = $elm_selected.get(0).style.borderRightWidth;
                        var nBorderRightWidth = parseInt(s);
                        if(!isNaN(nBorderRightWidth)) {
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmBorderRightWidthUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmBorderRightWidthUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmBorderRightWidthUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmBorderRightWidthUnit').val('em');
                            }

                            jQuery('#inpElmBorderRightWidth').val(nBorderRightWidth);

                            if(s.indexOf('solid')!=-1){
                                jQuery('#inpElmBorderRightStyle').val('solid');
                            }
                            if(s.indexOf('dashed')!=-1){
                                jQuery('#inpElmBorderRightStyle').val('dashed');
                            }
                            if(s.indexOf('dotted')!=-1){
                                jQuery('#inpElmBorderRightStyle').val('dotted');
                            }
                        } else {
                            var s = $elm_selected.get(0).style.borderRight;
                            if(s.indexOf('none')!=-1){
                                jQuery('#inpElmBorderRightWidthUnit').val('none');
                                jQuery('#inpElmBorderRightWidth').val('');
                                jQuery('#inpElmBorderRightStyle').val('');
                            }
                        }

                        jQuery('#inpElmBorderTopStyle').val('');
                        var sBorderTopStyle = $elm_selected.get(0).style.borderTopStyle;
                        if(jQuery('#inpElmBorderTopStyle option[value="'+sBorderTopStyle+'"]').length>0) {
                            jQuery('#inpElmBorderTopStyle').val(sBorderTopStyle);
                        }

                        jQuery('#inpElmBorderBottomStyle').val('');
                        var sBorderBottomStyle = $elm_selected.get(0).style.borderBottomStyle;
                        if(jQuery('#inpElmBorderBottomStyle option[value="'+sBorderBottomStyle+'"]').length>0) {
                            jQuery('#inpElmBorderBottomStyle').val(sBorderBottomStyle);
                        }

                        jQuery('#inpElmBorderLeftStyle').val('');
                        var sBorderLeftStyle = $elm_selected.get(0).style.borderLeftStyle;
                        if(jQuery('#inpElmBorderLeftStyle option[value="'+sBorderLeftStyle+'"]').length>0) {
                            jQuery('#inpElmBorderLeftStyle').val(sBorderLeftStyle);
                        }

                        jQuery('#inpElmBorderRightStyle').val('');
                        var sBorderRightStyle = $elm_selected.get(0).style.borderRightStyle;
                        if(jQuery('#inpElmBorderRightStyle option[value="'+sBorderRightStyle+'"]').length>0) {
                            jQuery('#inpElmBorderRightStyle').val(sBorderRightStyle);
                        }

                       jQuery('#inpElmDisplay').val('');
                        var sDisplay = $elm_selected.get(0).style.display;
                        if(jQuery('#inpElmDisplay option[value="'+sDisplay+'"]').length>0) {
                            jQuery('#inpElmDisplay').val(sDisplay);
                        }

                        jQuery('#inpElmPosition').val('');
                        var sPosition = $elm_selected.get(0).style.position;
                        if(jQuery('#inpElmPosition option[value="'+sPosition+'"]').length>0) {
                            jQuery('#inpElmPosition').val(sPosition);
                        }

                        jQuery('#inpElmFloat').val('');
                        var sFloat = $elm_selected.get(0).style.float;
                        if(jQuery('#inpElmFloat option[value="'+sFloat+'"]').length>0) {
                            jQuery('#inpElmFloat').val(sFloat);
                        }

                        jQuery('#inpElmFlexDirection').val('');
                        var sFlexDirection = $elm_selected.get(0).style.flexDirection;
                        if(jQuery('#inpElmFlexDirection option[value="'+sFlexDirection+'"]').length>0) {
                            jQuery('#inpElmFlexDirection').val(sFlexDirection);
                        }

                        jQuery('#inpElmFlexWrap').val('');
                        var sFlexWrap = $elm_selected.get(0).style.flexWrap;
                        if(jQuery('#inpElmFlexWrap option[value="'+sFlexWrap+'"]').length>0) {
                            jQuery('#inpElmFlexWrap').val(sFlexWrap);
                        }

                        jQuery('#inpElmJustifyContent').val('');
                        var sJustifyContent = $elm_selected.get(0).style.justifyContent;
                        if(jQuery('#inpElmJustifyContent option[value="'+sJustifyContent+'"]').length>0) {
                            jQuery('#inpElmJustifyContent').val(sJustifyContent);
                        }

                        jQuery('#inpElmAlignItems').val('');
                        var sAlignItems = $elm_selected.get(0).style.alignItems;
                        if(jQuery('#inpElmAlignItems option[value="'+sAlignItems+'"]').length>0) {
                            jQuery('#inpElmAlignItems').val(sAlignItems);
                        }

                        jQuery('#inpElmAlignContent').val('');
                        var sAlignContent = $elm_selected.get(0).style.alignContent;
                        if(jQuery('#inpElmAlignContent option[value="'+sAlignContent+'"]').length>0) {
                            jQuery('#inpElmAlignContent').val(sAlignContent);
                        }

                        jQuery('#inpElmTop').val('');
                        jQuery('#inpElmTopUnit').val('px');
                        var s = $elm_selected.get(0).style.top;
                        var nTop = parseInt(s);
                        if(!isNaN(nTop)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmTopUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmTopUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmTopUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmTopUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmTopUnit').val('em');
                            }
                            jQuery('#inpElmTop').val(nTop);
                        }

                        jQuery('#inpElmBottom').val('');
                        jQuery('#inpElmBottomUnit').val('px');
                        var s = $elm_selected.get(0).style.bottom;
                        var nBottom = parseInt(s);
                        if(!isNaN(nBottom)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmBottomUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmBottomUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmBottomUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmBottomUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmBottomUnit').val('em');
                            }
                            jQuery('#inpElmBottom').val(nBottom);
                        }

                        jQuery('#inpElmLeft').val('');
                        jQuery('#inpElmLeftUnit').val('px');
                        var s = $elm_selected.get(0).style.left;
                        var nLeft = parseInt(s);
                        if(!isNaN(nLeft)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmLeftUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmLeftUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmLeftUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmLeftUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmLeftUnit').val('em');
                            }
                            jQuery('#inpElmLeft').val(nLeft);
                        }

                        jQuery('#inpElmRight').val('');
                        jQuery('#inpElmRightUnit').val('px');
                        var s = $elm_selected.get(0).style.right;
                        var nRight = parseInt(s);
                        if(!isNaN(nRight)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmRightUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmRightUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmRightUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmRightUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmRightUnit').val('em');
                            }
                            jQuery('#inpElmRight').val(nRight);
                        }

                        jQuery('#inpElmOpacity').val('');
                        var sOpacity = $elm_selected.get(0).style.opacity;
                        if(sOpacity!='') {
                            jQuery('#inpElmOpacity').val(sOpacity);
                        }

                        //filter
                        var sFilter = $elm_selected.get(0).style.filter; //'brightness(2) blur(1px) contrast(100%)'

                        var arr = sFilter.split(" ");

                        jQuery('#inpElmBlur').val('');
                        jQuery('#inpElmBrightness').val('');

                        for(var i=0;i<arr.length;i++){

                            var s = arr[i];

                            if(s.indexOf('blur')!=-1){
                                //blur exists
                                var val = s.replace('blur(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmBlur').val(val);
                            }

                            if(s.indexOf('brightness')!=-1){
                                //brightness exists
                                val = s.replace('brightness(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmBrightness').val(val);
                            }

                            if(s.indexOf('grayscale')!=-1){
                                //grayscale exists
                                val = s.replace('grayscale(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmGrayscale').val(val);
                            }

                            if(s.indexOf('contrast')!=-1){
                                //contrast exists
                                val = s.replace('contrast(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmContrast').val(val);
                            }

                            if(s.indexOf('hue-rotate')!=-1){
                                //hue-rotate exists
                                val = s.replace('hue-rotate(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmHueRotate').val(val);
                            }

                            if(s.indexOf('invert')!=-1){
                                //invert exists
                                val = s.replace('invert(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmInvert').val(val);
                            }

                            if(s.indexOf('saturate')!=-1){
                                //saturate exists
                                val = s.replace('saturate(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmSaturate').val(val);
                            }

                            if(s.indexOf('sepia')!=-1){
                                //sepia exists
                                val = s.replace('sepia(','').replace(')','');
                                val = parseInt(val);
                                jQuery('#inpElmSepia').val(val);
                            }

                        }

                        var indx = 1;
                        jQuery('#inpElmAttr1,#inpElmAttr2,#inpElmAttr3,#inpElmAttr4,#inpElmAttr5,#inpElmAttrVal1,#inpElmAttrVal2,#inpElmAttrVal3,#inpElmAttrVal4,#inpElmAttrVal5').val('');
                        jQuery.each($elm_selected[0].attributes, function (index, attribute) {

                            if(attribute.name!='id' && attribute.name!='style' && attribute.name!='class' && attribute.name!='href' && attribute.name!='src' && attribute.name!='contenteditable' && attribute.name!='data-filename' && attribute.name!='data-saveforundo'){
                                jQuery('#inpElmAttr' + indx).val(attribute.name);
                                jQuery('#inpElmAttrVal' + indx).val(attribute.value);
                                indx = indx + 1;
                            }
                        });

                        jQuery('#inpElmPaddingTop').val('');
                        jQuery('#inpElmPaddingTopUnit').val('px');
                        var s = $elm_selected.get(0).style.paddingTop;
                        var nPaddingTop = parseInt(s);
                        if(!isNaN(nPaddingTop)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmPaddingTopUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmPaddingTopUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmPaddingTopUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmPaddingTopUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmPaddingTopUnit').val('em');
                            }
                            jQuery('#inpElmPaddingTop').val(nPaddingTop);
                        }

                        jQuery('#inpElmPaddingBottom').val('');
                        jQuery('#inpElmPaddingBottomUnit').val('px');
                        var s = $elm_selected.get(0).style.paddingBottom;
                        var nPaddingBottom = parseInt(s);
                        if(!isNaN(nPaddingBottom)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmPaddingBottomUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmPaddingBottomUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmPaddingBottomUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmPaddingBottomUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmPaddingBottomUnit').val('em');
                            }
                            jQuery('#inpElmPaddingBottom').val(nPaddingBottom);
                        }

                        jQuery('#inpElmPaddingLeft').val('');
                        jQuery('#inpElmPaddingLeftUnit').val('px');
                        var s = $elm_selected.get(0).style.paddingLeft;
                        var nPaddingLeft = parseInt(s);
                        if(!isNaN(nPaddingLeft)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmPaddingLeftUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmPaddingLeftUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmPaddingLeftUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmPaddingLeftUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmPaddingLeftUnit').val('em');
                            }
                            jQuery('#inpElmPaddingLeft').val(nPaddingLeft);
                        }

                        jQuery('#inpElmPaddingRight').val('');
                        jQuery('#inpElmPaddingRightUnit').val('px');
                        var s = $elm_selected.get(0).style.paddingRight;
                        var nPaddingRight = parseInt(s);
                        if(!isNaN(nPaddingRight)) {
                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmPaddingRightUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmPaddingRightUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmPaddingRightUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmPaddingRightUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmPaddingRightUnit').val('em');
                            }
                            jQuery('#inpElmPaddingRight').val(nPaddingRight);
                        }

                        jQuery('#inpElmMarginTop').val('');
                        jQuery('#inpElmMarginTopUnit').val('px');
                        var s = $elm_selected.get(0).style.marginTop;
                        var nMarginTop = parseInt(s);
                        if(!isNaN(nMarginTop)) {

                            jQuery('#inpElmMarginTop').val(nMarginTop);

                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('em');
                            }
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('auto');
                                jQuery('#inpElmMarginTop').val('');
                            }
                        } else{
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginTopUnit').val('auto');
                                jQuery('#inpElmMarginTop').val('');
                            }
                        }

                        jQuery('#inpElmMarginBottom').val('');
                        jQuery('#inpElmMarginBottomUnit').val('px');
                        var s = $elm_selected.get(0).style.marginBottom;
                        var nMarginBottom = parseInt(s);
                        if(!isNaN(nMarginBottom)) {

                            jQuery('#inpElmMarginBottom').val(nMarginBottom);

                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('em');
                            }
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('auto');
                                jQuery('#inpElmMarginBottom').val('');
                            }
                        } else{
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginBottomUnit').val('auto');
                                jQuery('#inpElmMarginBottom').val('');
                            }
                        }

                        jQuery('#inpElmMarginLeft').val('');
                        jQuery('#inpElmMarginLeftUnit').val('px');
                        var s = $elm_selected.get(0).style.marginLeft;
                        var nMarginLeft = parseInt(s);
                        if(!isNaN(nMarginLeft)) {

                            jQuery('#inpElmMarginLeft').val(nMarginLeft);

                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('em');
                            }
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('auto');
                                jQuery('#inpElmMarginLeft').val('');
                            }
                        } else{
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginLeftUnit').val('auto');
                                jQuery('#inpElmMarginLeft').val('');
                            }
                        }

                        jQuery('#inpElmMarginRight').val('');
                        jQuery('#inpElmMarginRightUnit').val('px');
                        var s = $elm_selected.get(0).style.marginRight;
                        var nMarginRight = parseInt(s);
                        if(!isNaN(nMarginRight)) {

                            jQuery('#inpElmMarginRight').val(nMarginRight);

                            if(s.indexOf('%')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('%');
                            }
                            if(s.indexOf('px')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('px');
                            }
                            if(s.indexOf('vw')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('vw');
                            }
                            if(s.indexOf('vh')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('vh');
                            }
                            if(s.indexOf('em')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('em');
                            }
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('auto');
                                jQuery('#inpElmMarginRight').val('');
                            }
                        } else{
                            if(s.indexOf('auto')!=-1){
                                jQuery('#inpElmMarginRightUnit').val('auto');
                                jQuery('#inpElmMarginRight').val('');
                            }
                        }

                        //Animate

                        jQuery('#selElmAnimDelay').val('');
                        var animname = $elm_selected.attr('data-aos-delay');
                        if(jQuery("#selElmAnimDelay option[value='" + animname + "']").length > 0){
                            jQuery('#selElmAnimDelay').val(animname);
                        }

                        jQuery('#selElmAnimDuration').val('');
                        var animname = $elm_selected.attr('data-aos-duration');
                        if(jQuery("#selElmAnimDuration option[value='" + animname + "']").length > 0){
                            jQuery('#selElmAnimDuration').val(animname);
                        }

                        jQuery("#chkAnimateOnce").prop("checked", false);
                        var animateonce = $elm_selected.attr('data-aos-once');
                        if(animateonce) {
                            if(animateonce=='true'){
                                jQuery("#chkAnimateOnce").prop("checked", true);
                            }
                        }

                        jQuery('#selElmAnim').val('');
                        var animname = $elm_selected.attr('data-aos');
                        if(jQuery("#selElmAnim option[value='" + animname + "']").length > 0){
                            jQuery('#selElmAnim').val(animname);
                        }


                        var sClassName = $elm_selected.attr('class');
                        sClassName = sClassName.replace('elm-active', '');
                        sClassName = sClassName.replace('elm-inspected', '');
                        sClassName = jQuery.trim(sClassName.replace('  ', ' '));
                        jQuery('#inpElmClassName').val(sClassName);

                        return false;

                    });

                } //while

                //-- Show Side Panel

                var $modal = jQuery('.is-side.elementstyles');

                plugin.showSidePanel($modal, true);

                jQuery('#divEditStyle').css('display','');

                //Hide elements
                plugin.hideElementTools();
                jQuery('#divRteTool').css('display', 'none');
                jQuery('#divCellTool').css('display', 'none');
                jQuery('#divRowAddTool').css('display', 'none');
                jQuery(".is-row-tool").css("display", "");
                jQuery('.row-active').removeClass('row-active');
                jQuery('.row-outline').removeClass('row-outline');
                jQuery('.cell-active').removeClass('cell-active');
                //-- /Show Side Panel

                $modal.find('.is-side-close').off("click");
                $modal.find(".is-side-close").on('click', function () {

                    jQuery('#divEditStyle').css('display','none');

                    plugin.hideSidePanel();
                });

                jQuery('.elm-list > a.active').trigger('click');

                //Background Gradient
                jQuery(".input-elm-gradient").unbind("click");
                jQuery(".input-elm-gradient").on('click', function (e) {

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    //Read gradient
                    jQuery("#inpElmGrad1").val('');
                    jQuery("#inpElmGrad2").val('');
                    jQuery("#inpElmGradDeg").val(0);
                    if($elm_selected.css("background-image").indexOf('linear-gradient')!=-1){

                        var s = jQuery.trim($elm_selected.css("background-image"));

                        var result = plugin.getGradient(s);
                        if(result !== null) {
                            var _color1 = result.colorStopList[0].color;
                            var _color2 = result.colorStopList[1].color;
                            var _line = result.line;

                            jQuery("#inpElmGrad1").val(_color1);
                            jQuery("#inpElmGrad2").val(_color2);

                            if(_line.indexOf('deg')!=-1){
                                jQuery("#inpElmGradDeg").val(_line.replace('deg',''));
                            }
                        }

                    }

                    //show modal
                    var $modal = jQuery('.is-modal.pickgradientcolor');
                    plugin.showModal($modal, false, false, null, false);

                    //custom grad colors
                    if (localStorage.getItem("_customgradcolors") != null) {
                        customgradcolors = JSON.parse(localStorage.getItem("_customgradcolors"));

                        var html_gradcolors = '';
                        for (var i = 0; i < customgradcolors.length; i++) {
                            html_gradcolors += '<button class="is-elmgrad-item" data-elmgradient="' + customgradcolors[i] + '" style="background-image:' + customgradcolors[i] + ';width: 50px;border:none;"><div class="is-elmgrad-remove"><svg class="is-icon-flex" style="fill:rgba(255, 255, 255, 1);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div></button>';
                        }
                        jQuery('#divCustomElmGradColors').html(html_gradcolors);
                    }

                    jQuery("[data-elmgradient]").unbind("click");
                    jQuery("[data-elmgradient]").on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                        var css = jQuery(this).data('elmgradient');
                        $elm_selected.css("background-image", css);

                        //Read gradient
                        if($elm_selected.css("background-image").indexOf('linear-gradient')!=-1){

                            var s = jQuery.trim($elm_selected.css("background-image"));

                            var result = plugin.getGradient(s);
                            if(result !== null) {
                                var _color1 = result.colorStopList[0].color;
                                var _color2 = result.colorStopList[1].color;
                                var _line = result.line;

                                jQuery("#inpElmGrad1").val(_color1);
                                jQuery("#inpElmGrad2").val(_color2);

                                if(_line.indexOf('deg')!=-1){
                                    jQuery("#inpElmGradDeg").val(_line.replace('deg',''));
                                }
                            }

                        }

                        jQuery("[data-elmgradient]").removeClass('active');
                        jQuery(this).addClass('active');

                        jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);

                    });

                    jQuery('.is-elmgrad-remove').off('click');
                    jQuery('.is-elmgrad-remove').on('click', function(){

                        if (localStorage.getItem("_customgradcolors") != null) {
                            customgradcolors = JSON.parse(localStorage.getItem("_customgradcolors"));
                        }

                        var css = jQuery(this).parent().data('elmgradient');
                        for (var i = 0; i < customgradcolors.length; i++) {
                            if(customgradcolors[i]==css){
                                customgradcolors.splice(i, 1);
                            }
                        }

                        localStorage.setItem("_customgradcolors", JSON.stringify(customgradcolors));

                        jQuery(this).parent().remove();

                        return false;

                    });

                    return false;
                });

                jQuery("[data-elmgradient]").unbind("click");
                jQuery("[data-elmgradient]").on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var css = jQuery(this).data('elmgradient');
                    $elm_selected.css("background-image", css);

                    //Read gradient
                    if($elm_selected.css("background-image").indexOf('linear-gradient')!=-1){

                        var s = jQuery.trim($elm_selected.css("background-image"));

                        var result = plugin.getGradient(s);
                        if(result !== null) {
                            var _color1 = result.colorStopList[0].color;
                            var _color2 = result.colorStopList[1].color;
                            var _line = result.line;

                            jQuery("#inpElmGrad1").val(_color1);
                            jQuery("#inpElmGrad2").val(_color2);

                            if(_line.indexOf('deg')!=-1){
                                jQuery("#inpElmGradDeg").val(_line.replace('deg',''));
                            }
                        }

                    }

                    jQuery("[data-elmgradient]").removeClass('active');
                    jQuery(this).addClass('active');

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);

                });

                jQuery('.is-elmgrad-remove').off('click');
                jQuery('.is-elmgrad-remove').on('click', function(){

                    if (localStorage.getItem("_customgradcolors") != null) {
                        customgradcolors = JSON.parse(localStorage.getItem("_customgradcolors"));
                    }

                    var css = jQuery(this).parent().data('elmgradient');
                    for (var i = 0; i < customgradcolors.length; i++) {
                        if(customgradcolors[i]==css){
                            customgradcolors.splice(i, 1);
                        }
                    }

                    localStorage.setItem("_customgradcolors", JSON.stringify(customgradcolors));

                    jQuery(this).parent().remove();

                    return false;

                });

                jQuery(".cmd-elm-pickgradient1").unbind("click");
                jQuery(".cmd-elm-pickgradient1").on('click', function (e) {

                    plugin.pickColor(function (color) {

                        //Save for Undo
                        plugin.saveForUndo();

                        jQuery("#inpElmGrad1").val(color);

                        if(jQuery("#inpElmGrad2").val()==""){
                            jQuery("#inpElmGrad2").val("#fff");
                        }

                        if(jQuery('.elm-list > a.active').length>0){
                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css("background-image", "linear-gradient(" + jQuery("#inpElmGradDeg").val() + "deg," + jQuery("#inpElmGrad1").val() + "," + jQuery("#inpElmGrad2").val() +")");

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }

                    }, jQuery('#inpElmGrad1').val());

                });

                jQuery(".cmd-elm-pickgradient2").unbind("click");
                jQuery(".cmd-elm-pickgradient2").on('click', function (e) {

                    plugin.pickColor(function (color) {

                        //Save for Undo
                        plugin.saveForUndo();

                        jQuery("#inpElmGrad2").val(color);

                        if(jQuery("#inpElmGrad1").val()==""){
                            jQuery("#inpElmGrad1").val("#fff");
                        }

                        if(jQuery('.elm-list > a.active').length>0){
                            var $elm = jQuery('.elm-list > a.active').data('elm');
                            $elm.css("background-image", "linear-gradient(" + jQuery("#inpElmGradDeg").val() + "deg," + jQuery("#inpElmGrad1").val() + "," + jQuery("#inpElmGrad2").val() +")");

                            jQuery('#inpElmInlineStyle').val($elm.get(0).style.cssText);
                        }

                    }, jQuery('#inpElmGrad2').val());

                });

                jQuery('#inpElmGradDeg').off('keyup');
                jQuery('#inpElmGradDeg').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    if(jQuery("#inpElmGrad1").val()==""){
                        jQuery("#inpElmGrad1").val("#fff");
                    }

                    if(jQuery("#inpElmGrad2").val()==""){
                        jQuery("#inpElmGrad2").val("#fff");
                    }

                    $elm_selected.css("background-image", "linear-gradient(" + jQuery("#inpElmGradDeg").val() + "deg," + jQuery("#inpElmGrad1").val() + "," + jQuery("#inpElmGrad2").val() +")");

                });

                jQuery('#inpElmGradClear').off('click');
                jQuery('#inpElmGradClear').on('click', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    $elm_selected.css("background-image","");

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);

                });

                jQuery('.cmd-elm-savegrad').off('click');
                jQuery('.cmd-elm-savegrad').on('click', function(){

                    if(jQuery("#inpElmGrad1").val()==""){
                        jQuery("#inpElmGrad1").val("#fff");
                    }

                    if(jQuery("#inpElmGrad2").val()==""){
                        jQuery("#inpElmGrad2").val("#fff");
                    }

                    //Add

                    if (localStorage.getItem("_customgradcolors") != null) {
                       customgradcolors = JSON.parse(localStorage.getItem("_customgradcolors"));
                    }

                    customgradcolors.push("linear-gradient(" + jQuery("#inpElmGradDeg").val() + "deg," + jQuery("#inpElmGrad1").val() + "," + jQuery("#inpElmGrad2").val() +")");
                    localStorage.setItem("_customgradcolors", JSON.stringify(customgradcolors));

                    var html_gradcolors = '';
                    for (var i = 0; i < customgradcolors.length; i++) {
                        html_gradcolors += '<button class="is-elmgrad-item" data-elmgradient="' + customgradcolors[i] + '" style="background-image:' + customgradcolors[i] + ';width: 50px;border:none;"><div class="is-elmgrad-remove"><svg class="is-icon-flex" style="fill:rgba(255, 255, 266, 1);width:20px;height:20px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div></button>';
                    }
                    jQuery('#divCustomElmGradColors').html(html_gradcolors);

                    jQuery("[data-elmgradient]").unbind("click");
                    jQuery("[data-elmgradient]").on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                        var css = jQuery(this).data('elmgradient');
                        $elm_selected.css("background-image", css);

                        //Read gradient
                        jQuery("#inpElmGrad1").val('');
                        jQuery("#inpElmGrad2").val('');
                        jQuery("#inpElmGradDeg").val(0);
                        if($elm_selected.css("background-image").indexOf('linear-gradient')!=-1){

                            var s = jQuery.trim($elm_selected.css("background-image"));

                            var result = plugin.getGradient(s);
                            if(result !== null) {
                                var _color1 = result.colorStopList[0].color;
                                var _color2 = result.colorStopList[1].color;
                                var _line = result.line;

                                jQuery("#inpElmGrad1").val(_color1);
                                jQuery("#inpElmGrad2").val(_color2);

                                if(_line.indexOf('deg')!=-1){
                                    jQuery("#inpElmGradDeg").val(_line.replace('deg',''));
                                }
                            }

                        }

                        jQuery("[data-elmgradient]").removeClass('active');
                        jQuery(this).addClass('active');

                        jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);

                    });

                    jQuery('.is-elmgrad-remove').off('click');
                    jQuery('.is-elmgrad-remove').on('click', function(){

                        if (localStorage.getItem("_customgradcolors") != null) {
                            customgradcolors = JSON.parse(localStorage.getItem("_customgradcolors"));
                        }

                        var css = jQuery(this).parent().data('elmgradient');
                        for (var i = 0; i < customgradcolors.length; i++) {
                            if(customgradcolors[i]==css){
                                customgradcolors.splice(i, 1);
                            }
                        }

                        localStorage.setItem("_customgradcolors", JSON.stringify(customgradcolors));

                        jQuery(this).parent().remove();

                        return false;

                    });

                });
                //End Background Gradient

                jQuery('#inpElmMaxWidth').off('keyup');
                jQuery('#inpElmMaxWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('max-width', val + jQuery('#inpElmMaxWidthUnit').val());
                    } else {
                        $elm_selected.css('max-width', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMaxWidthUnit').off('change');
                jQuery('#inpElmMaxWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('max-width', jQuery('#inpElmMaxWidth').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMaxHeight').off('keyup');
                jQuery('#inpElmMaxHeight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('max-height', val + jQuery('#inpElmMaxHeightUnit').val());
                    } else {
                        $elm_selected.css('max-height', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMaxHeightUnit').off('change');
                jQuery('#inpElmMaxHeightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('max-height', jQuery('#inpElmMaxHeight').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMinWidth').off('keyup');
                jQuery('#inpElmMinWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('min-width', val + jQuery('#inpElmMinWidthUnit').val());
                    } else {
                        $elm_selected.css('min-width', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMinWidthUnit').off('change');
                jQuery('#inpElmMinWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('min-width', jQuery('#inpElmMinWidth').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMinHeight').off('keyup');
                jQuery('#inpElmMinHeight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('min-height', val + jQuery('#inpElmMinHeightUnit').val());
                    } else {
                        $elm_selected.css('min-height', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });
                jQuery('#inpElmMinHeightUnit').off('change');
                jQuery('#inpElmMinHeightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('min-height', jQuery('#inpElmMinHeight').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmWidth').off('keyup');
                jQuery('#inpElmWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('width', val + jQuery('#inpElmWidthUnit').val());
                    } else {
                        $elm_selected.css('width', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmWidthUnit').off('change');
                jQuery('#inpElmWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    $elm_selected.css('width', jQuery('#inpElmWidth').val() + unit);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmHeight').off('keyup');
                jQuery('#inpElmHeight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('height', val + jQuery('#inpElmHeightUnit').val());
                    } else {
                        $elm_selected.css('height', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmHeightUnit').off('change');
                jQuery('#inpElmHeightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('height', jQuery('#inpElmHeight').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmOverflowX').off('change');
                jQuery('#inpElmOverflowX').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('overflow-x', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmOverflowY').off('change');
                jQuery('#inpElmOverflowY').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('overflow-y', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginLeft').off('keyup');
                jQuery('#inpElmMarginLeft').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('margin-left', val + jQuery('#inpElmMarginLeftUnit').val());
                    } else {
                        $elm_selected.css('margin-left', '');
                    }

                    if(jQuery('#inpElmMarginLeftUnit').val() == 'auto'){
                        $elm_selected.css('margin-left', 'auto');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginLeftUnit').off('change');
                jQuery('#inpElmMarginLeftUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'auto'){
                        $elm_selected.css('margin-left', 'auto');
                        jQuery('#inpElmMarginLeft').val('');
                    } else {
                        $elm_selected.css('margin-left', jQuery('#inpElmMarginLeft').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginRight').off('keyup');
                jQuery('#inpElmMarginRight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('margin-right', val + jQuery('#inpElmMarginRightUnit').val());
                    } else {
                        $elm_selected.css('margin-right', '');
                    }

                    if(jQuery('#inpElmMarginRightUnit').val() == 'auto'){
                        $elm_selected.css('margin-right', 'auto');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginRightUnit').off('change');
                jQuery('#inpElmMarginRightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'auto'){
                        $elm_selected.css('margin-right', 'auto');
                        jQuery('#inpElmMarginRight').val('');
                    } else {
                        $elm_selected.css('margin-right', jQuery('#inpElmMarginRight').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery("#chkResetMarginLeft").off("click");
                jQuery("#chkResetMarginLeft").on('click', function (e) {

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    if(jQuery("#chkResetMarginLeft").prop("checked")){
                        $elm_selected.addClass('margin-left-1024-reset');
                    } else {
                        $elm_selected.removeClass('margin-left-1024-reset');
                    }

                    var sClassName = $elm_selected.attr('class');
                    sClassName = sClassName.replace('elm-active', '');
                    sClassName = sClassName.replace('elm-inspected', '');
                    sClassName = jQuery.trim(sClassName.replace('  ', ' '));
                    jQuery('#inpElmClassName').val(sClassName);
                });

                jQuery("#chkResetMarginRight").off("click");
                jQuery("#chkResetMarginRight").on('click', function (e) {

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    if(jQuery("#chkResetMarginRight").prop("checked")){
                        $elm_selected.addClass('margin-right-1024-reset');
                    } else {
                        $elm_selected.removeClass('margin-right-1024-reset');
                    }

                    var sClassName = $elm_selected.attr('class');
                    sClassName = sClassName.replace('elm-active', '');
                    sClassName = sClassName.replace('elm-inspected', '');
                    sClassName = jQuery.trim(sClassName.replace('  ', ' '));
                    jQuery('#inpElmClassName').val(sClassName);
                });

                jQuery('#inpElmMarginTop').off('keyup');
                jQuery('#inpElmMarginTop').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('margin-top', val + jQuery('#inpElmMarginTopUnit').val());
                    } else {
                        $elm_selected.css('margin-top', '');
                    }

                    if(jQuery('#inpElmMarginTopUnit').val() == 'auto'){
                        $elm_selected.css('margin-top', 'auto');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginTopUnit').off('change');
                jQuery('#inpElmMarginTopUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'auto'){
                        $elm_selected.css('margin-top', 'auto');
                        jQuery('#inpElmMarginTop').val('');
                    } else {
                        $elm_selected.css('margin-top', jQuery('#inpElmMarginTop').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginBottom').off('keyup');
                jQuery('#inpElmMarginBottom').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('margin-bottom', val + jQuery('#inpElmMarginBottomUnit').val());
                    } else {
                        $elm_selected.css('margin-bottom', '');
                    }

                    if(jQuery('#inpElmMarginBottomUnit').val() == 'auto'){
                        $elm_selected.css('margin-bottom', 'auto');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmMarginBottomUnit').off('change');
                jQuery('#inpElmMarginBottomUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'auto'){
                        $elm_selected.css('margin-bottom', 'auto');
                        jQuery('#inpElmMarginBottom').val('');
                    } else {
                        $elm_selected.css('margin-bottom', jQuery('#inpElmMarginBottom').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingLeft').off('keyup');
                jQuery('#inpElmPaddingLeft').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('padding-left', val + jQuery('#inpElmPaddingLeftUnit').val());
                    } else {
                        $elm_selected.css('padding-left', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingLeftUnit').off('change');
                jQuery('#inpElmPaddingLeftUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    $elm_selected.css('padding-left', jQuery('#inpElmPaddingLeft').val() + unit);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingRight').off('keyup');
                jQuery('#inpElmPaddingRight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('padding-right', val + jQuery('#inpElmPaddingRightUnit').val());
                    } else {
                        $elm_selected.css('padding-right', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingRightUnit').off('change');
                jQuery('#inpElmPaddingRightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    $elm_selected.css('padding-right', jQuery('#inpElmPaddingRight').val() + unit);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingTop').off('keyup');
                jQuery('#inpElmPaddingTop').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('padding-top', val + jQuery('#inpElmPaddingTopUnit').val());
                    } else {
                        $elm_selected.css('padding-top', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingTopUnit').off('change');
                jQuery('#inpElmPaddingTopUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    $elm_selected.css('padding-top', jQuery('#inpElmPaddingTop').val() + unit);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingBottom').off('keyup');
                jQuery('#inpElmPaddingBottom').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('padding-bottom', val + jQuery('#inpElmPaddingBottomUnit').val());
                    } else {
                        $elm_selected.css('padding-bottom', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPaddingBottomUnit').off('change');
                jQuery('#inpElmPaddingBottomUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    $elm_selected.css('padding-bottom', jQuery('#inpElmPaddingBottom').val() + unit);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderWidth').off('keyup');
                jQuery('#inpElmBorderWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-style', 'solid');//refresh
                        $elm_selected.css('border-width', val + jQuery('#inpElmBorderWidthUnit').val());
                        $elm_selected.css('border-style', jQuery('#inpElmBorderStyle').val());
                    } else {
                        $elm_selected.css('border-style', 'solid');//refresh
                        $elm_selected.css('border-width', '');
                        $elm_selected.css('border-style', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderWidthUnit').off('change');
                jQuery('#inpElmBorderWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'none'){
                        $elm_selected.css('border', 'none');
                        jQuery('#inpElmBorderWidth').val('');
                        jQuery('#inpElmBorderStyle').val('');
                    } else {
                        $elm_selected.css('border-width', jQuery('#inpElmBorderWidth').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderRadius').off('keyup');
                jQuery('#inpElmBorderRadius').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-radius', val + 'px');
                    } else {
                        $elm_selected.css('border-radius', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderTopLeftRadius').off('keyup');
                jQuery('#inpElmBorderTopLeftRadius').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-top-left-radius', val + 'px');
                    } else {
                        $elm_selected.css('border-top-left-radius', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderTopRightRadius').off('keyup');
                jQuery('#inpElmBorderTopRightRadius').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-top-right-radius', val + 'px');
                    } else {
                        $elm_selected.css('border-top-right-radius', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderBottomLeftRadius').off('keyup');
                jQuery('#inpElmBorderBottomLeftRadius').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-bottom-left-radius', val + 'px');
                    } else {
                        $elm_selected.css('border-bottom-left-radius', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderBottomRightRadius').off('keyup');
                jQuery('#inpElmBorderBottomRightRadius').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-bottom-right-radius', val + 'px');
                    } else {
                        $elm_selected.css('border-bottom-right-radius', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderStyle').off('change');
                jQuery('#inpElmBorderStyle').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('border-style', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });


                jQuery('#inpElmBoxShadowX,#inpElmBoxShadowY,#inpElmBoxShadowBlur,#inpElmBoxShadowSpread').off('keyup');
                jQuery('#inpElmBoxShadowX,#inpElmBoxShadowY,#inpElmBoxShadowBlur,#inpElmBoxShadowSpread').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var shadowColor = jQuery('.input-elm-shadowcolor').data('colorpicker').color();
                    var shadowInset = jQuery('#inpElmBoxShadowInset').val();

                    var val = jQuery('#inpElmBoxShadowX').val();
                    var unit = jQuery('#inpElmBoxShadowXUnit').val();
                    var offX = '';
                    if(!isNaN(val) && val!='') {
                        offX = val + unit;
                    }

                    val = jQuery('#inpElmBoxShadowY').val();
                    unit = jQuery('#inpElmBoxShadowYUnit').val();
                    var offY = '';
                    if(!isNaN(val) && val!='') {
                        offY = val + unit;
                    }
                    val = jQuery('#inpElmBoxShadowBlur').val();
                    unit = jQuery('#inpElmBoxShadowBlurUnit').val();
                    var blur = '';
                    if(!isNaN(val) && val!='') {
                        blur = val + unit;
                    }
                    val = jQuery('#inpElmBoxShadowSpread').val();
                    unit = jQuery('#inpElmBoxShadowSpreadUnit').val();
                    var spread = '';
                    if(!isNaN(val) && val!='') {
                        spread = val + unit;
                    }

                    $elm_selected.css('box-shadow', jQuery.trim(offX + ' ' + offY + ' ' + blur + ' ' + spread + ' ' + shadowColor + ' ' + shadowInset));

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBoxShadowXUnit,#inpElmBoxShadowYUnit,#inpElmBoxShadowBlurUnit,#inpElmBoxShadowSpreadUnit').off('change');
                jQuery('#inpElmBoxShadowXUnit,#inpElmBoxShadowYUnit,#inpElmBoxShadowBlurUnit,#inpElmBoxShadowSpreadUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var shadowColor = jQuery('.input-elm-shadowcolor').data('colorpicker').color();
                    var shadowInset = jQuery('#inpElmBoxShadowInset').val();

                    var val = jQuery('#inpElmBoxShadowX').val();
                    var unit = jQuery('#inpElmBoxShadowXUnit').val();
                    var offX = '';
                    if(!isNaN(val) && val!='') {
                        offX = val + unit;
                    }

                    val = jQuery('#inpElmBoxShadowY').val();
                    unit = jQuery('#inpElmBoxShadowYUnit').val();
                    var offY = '';
                    if(!isNaN(val) && val!='') {
                        offY = val + unit;
                    }
                    val = jQuery('#inpElmBoxShadowBlur').val();
                    unit = jQuery('#inpElmBoxShadowBlurUnit').val();
                    var blur = '';
                    if(!isNaN(val) && val!='') {
                        blur = val + unit;
                    }
                    val = jQuery('#inpElmBoxShadowSpread').val();
                    unit = jQuery('#inpElmBoxShadowSpreadUnit').val();
                    var spread = '';
                    if(!isNaN(val) && val!='') {
                        spread = val + unit;
                    }

                    $elm_selected.css('box-shadow', jQuery.trim(offX + ' ' + offY + ' ' + blur + ' ' + spread + ' ' + shadowColor + ' ' + shadowInset));

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBoxShadowInset').off('change');
                jQuery('#inpElmBoxShadowInset').on('change', function(){
                    jQuery('#inpElmBoxShadowX').trigger('keyup');
                });

                /*
                    Text Style
                    by Tinara
                */
                jQuery('#inpElmTextAlign').off('change');
                jQuery('#inpElmTextAlign').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('text-align', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFontWeight').off('change');
                jQuery('#inpElmFontWeight').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('font-weight', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFontStyle').off('change');
                jQuery('#inpElmFontStyle').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('font-style', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmTextTransform').off('change');
                jQuery('#inpElmTextTransform').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('text-transform', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmTextDecoration').off('change');
                jQuery('#inpElmTextDecoration').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('text-decoration', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFontSize').off('keyup');
                jQuery('#inpElmFontSize').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('font-size', val + jQuery('#inpElmFontSizeUnit').val());
                    } else {
                        $elm_selected.css('font-size', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFontSizeUnit').off('change');
                jQuery('#inpElmFontSizeUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();
                    var fontsize = jQuery('#inpElmFontSize').val();

                    if(!isNaN(fontsize) && fontsize!=''){
                        $elm_selected.css('font-size', fontsize+ unit);
                    } else {
                        $elm_selected.css('font-size', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmLineHeight').off('keyup');
                jQuery('#inpElmLineHeight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('line-height', val + jQuery('#inpElmLineHeightUnit').val());
                    } else {
                        $elm_selected.css('line-height', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmLineHeightUnit').off('change');
                jQuery('#inpElmLineHeightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();
                    var lineheight = jQuery('#inpElmLineHeight').val();

                    if(!isNaN(lineheight) && lineheight!=''){
                        $elm_selected.css('line-height', lineheight + unit);
                    } else {
                        $elm_selected.css('line-height', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmLetterSpacing').off('keyup');
                jQuery('#inpElmLetterSpacing').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('letter-spacing', val + 'px');
                    } else {
                        $elm_selected.css('letter-spacing','');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmWordSpacing').off('keyup');
                jQuery('#inpElmWordSpacing').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('word-spacing', val + 'px');
                    } else {
                        $elm_selected.css('word-spacing','');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFontFamily').off('keyup');
                jQuery('#inpElmFontFamily').on('keyup', function(){
                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('font-family', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                if(jQuery('.pickfontfamily').find('iframe').attr('src') == 'about:blank') {
                    jQuery('.pickfontfamily').find('iframe').attr('src', scriptPath+'fonts.html?11');
                }

                jQuery('.input-elm-fontfamily').off('click');
                jQuery('.input-elm-fontfamily').on('click', function(){
                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    //show modal
                    var $modal = jQuery('.is-modal.pickfontfamily');
                    plugin.showModal($modal);

                    //Get active font
                    var s = $elm_selected.get(0).style.fontFamily;
                    if(s!='') {

                        var fontname = s.split(',')[0];
                        fontname = fontname.replace('"','').replace('"','');
                        fontname = jQuery.trim(fontname).toLowerCase();

                        jQuery('.pickfontfamily').find('iframe').contents().find('[data-font-family]').removeClass('on');
                        jQuery('.pickfontfamily').find('iframe').contents().find('[data-font-family]').each(function(){
                            var f = jQuery(this).attr('data-font-family');
                            f = f.split(',')[0];
                            f = jQuery.trim(f).toLowerCase();

                            if(f==fontname && f!='') {
                                jQuery(this).addClass('on');
                            }
                        });

                    } else {

                        jQuery('.pickfontfamily').find('iframe').contents().find('[data-font-family]').removeClass('on');
                    }

                    //Select active font
                    try{
                        var $contents = jQuery('.pickfontfamily').find('iframe').contents();
                        var $parentDiv = $contents.find('#divFontList');
                        var $innerListItem = $contents.find('.on');
                        $parentDiv.animate({
                            scrollTop: $parentDiv.scrollTop() + $innerListItem.position().top - 7
                        }, 1000);
                    } catch(e){}

                    return false;

                });

                jQuery('#inpElmFloat').off('change');
                jQuery('#inpElmFloat').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('float', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderTopWidth').off('keyup');
                jQuery('#inpElmBorderTopWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-top-style', 'solid');//refresh
                        $elm_selected.css('border-top-width', val + jQuery('#inpElmBorderTopWidthUnit').val());
                        $elm_selected.css('border-top-style', jQuery('#inpElmBorderTopStyle').val());
                    } else {
                        $elm_selected.css('border-top-style', 'solid');//refresh
                        $elm_selected.css('border-top-width', '');
                        $elm_selected.css('border-top-style', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderTopWidthUnit').off('change');
                jQuery('#inpElmBorderTopWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'none'){
                        $elm_selected.css('border-top', 'none');
                        jQuery('#inpElmBorderTopWidth').val('');
                        jQuery('#inpElmBorderTopStyle').val('');
                    } else {
                        $elm_selected.css('border-top-width', jQuery('#inpElmBorderTopWidth').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderBottomWidth').off('keyup');
                jQuery('#inpElmBorderBottomWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-bottom-style', 'solid');//refresh
                        $elm_selected.css('border-bottom-width', val + jQuery('#inpElmBorderBottomWidthUnit').val());
                        $elm_selected.css('border-bottom-style', jQuery('#inpElmBorderBottomStyle').val());
                    } else {
                        $elm_selected.css('border-bottom-style', 'solid');//refresh
                        $elm_selected.css('border-bottom-width', '');
                        $elm_selected.css('border-bottom-style', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderBottomWidthUnit').off('change');
                jQuery('#inpElmBorderBottomWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'none'){
                        $elm_selected.css('border-bottom', 'none');
                        jQuery('#inpElmBorderBottomWidth').val('');
                        jQuery('#inpElmBorderBottomStyle').val('');
                    } else {
                        $elm_selected.css('border-bottom-width', jQuery('#inpElmBorderBottomWidth').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderLeftWidth').off('keyup');
                jQuery('#inpElmBorderLeftWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-left-style', 'solid');//refresh
                        $elm_selected.css('border-left-width', val + jQuery('#inpElmBorderLeftWidthUnit').val());
                        $elm_selected.css('border-left-style', jQuery('#inpElmBorderLeftStyle').val());
                    } else {
                        $elm_selected.css('border-left-style', 'solid');//refresh
                        $elm_selected.css('border-left-width', '');
                        $elm_selected.css('border-left-style', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderLeftWidthUnit').off('change');
                jQuery('#inpElmBorderLeftWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'none'){
                        $elm_selected.css('border-left', 'none');
                        jQuery('#inpElmBorderLeftWidth').val('');
                        jQuery('#inpElmBorderLeftStyle').val('');
                    } else {
                        $elm_selected.css('border-left-width', jQuery('#inpElmBorderLeftWidth').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderRightWidth').off('keyup');
                jQuery('#inpElmBorderRightWidth').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('border-right-style', 'solid');//refresh
                        $elm_selected.css('border-right-width', val + jQuery('#inpElmBorderRightWidthUnit').val());
                        $elm_selected.css('border-right-style', jQuery('#inpElmBorderRightStyle').val());
                    } else {
                        $elm_selected.css('border-right-style', 'solid');//refresh
                        $elm_selected.css('border-right-width', '');
                        $elm_selected.css('border-right-style', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderRightWidthUnit').off('change');
                jQuery('#inpElmBorderRightWidthUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var unit = jQuery(this).val();

                    if(unit == 'none'){
                        $elm_selected.css('border-right', 'none');
                        jQuery('#inpElmBorderRightWidth').val('');
                        jQuery('#inpElmBorderRightStyle').val('');
                    } else {
                        $elm_selected.css('border-right-width', jQuery('#inpElmBorderRightWidth').val() + unit);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderTopStyle').off('change');
                jQuery('#inpElmBorderTopStyle').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('border-top-style', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderBottomStyle').off('change');
                jQuery('#inpElmBorderBottomStyle').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('border-bottom-style', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderRightStyle').off('change');
                jQuery('#inpElmBorderRightStyle').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('border-right-style', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBorderLeftStyle').off('change');
                jQuery('#inpElmBorderLeftStyle').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('border-left-style', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmDisplay').off('change');
                jQuery('#inpElmDisplay').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('display', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmPosition').off('change');
                jQuery('#inpElmPosition').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('position', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFloat').off('change');
                jQuery('#inpElmFloat').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('float', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFlexDirection').off('change');
                jQuery('#inpElmFlexDirection').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('flex-direction', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmFlexWrap').off('change');
                jQuery('#inpElmFlexWrap').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('flex-wrap', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmJustifyContent').off('change');
                jQuery('#inpElmJustifyContent').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('justify-content', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmAlignItems').off('change');
                jQuery('#inpElmAlignItems').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('align-items', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmAlignContent').off('change');
                jQuery('#inpElmAlignContent').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('align-content', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmTop').off('keyup');
                jQuery('#inpElmTop').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('top', val + jQuery('#inpElmTopUnit').val());
                    } else {
                        $elm_selected.css('top', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmTopUnit').off('change');
                jQuery('#inpElmTopUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('top', jQuery('#inpElmTop').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBottom').off('keyup');
                jQuery('#inpElmBottom').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('bottom', val + jQuery('#inpElmBottomUnit').val());
                    } else {
                        $elm_selected.css('bottom', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBottomUnit').off('change');
                jQuery('#inpElmBottomUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('bottom', jQuery('#inpElmBottom').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmLeft').off('keyup');
                jQuery('#inpElmLeft').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('left', val + jQuery('#inpElmLeftUnit').val());
                    } else {
                        $elm_selected.css('left', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmLeftUnit').off('change');
                jQuery('#inpElmLeftUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('left', jQuery('#inpElmLeft').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmRight').off('keyup');
                jQuery('#inpElmRight').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    if(!isNaN(val) && val!=''){
                        $elm_selected.css('right', val + jQuery('#inpElmRightUnit').val());
                    } else {
                        $elm_selected.css('right', '');
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmRightUnit').off('change');
                jQuery('#inpElmRightUnit').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('right', jQuery('#inpElmRight').val() + val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmOpacity').off('keyup');
                jQuery('#inpElmOpacity').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.css('opacity', val);

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBlur').off('keyup');
                jQuery('#inpElmBlur').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('blur')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'blur('+ val + 'px)';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' blur('+ val + 'px)';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmBrightness').off('keyup');
                jQuery('#inpElmBrightness').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('brightness')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'brightness('+ val + ')';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' brightness('+ val + ')';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmContrast').off('keyup');
                jQuery('#inpElmContrast').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('contrast')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'contrast('+ val + '%)';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' contrast('+ val + '%)';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmGrayscale').off('keyup');
                jQuery('#inpElmGrayscale').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('grayscale')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'grayscale('+ val + '%)';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' grayscale('+ val + '%)';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmHueRotate').off('keyup');
                jQuery('#inpElmHueRotate').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('hue-rotate')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'hue-rotate('+ val + 'deg)';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' hue-rotate('+ val + 'deg)';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmInvert').off('keyup');
                jQuery('#inpElmInvert').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('invert')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'invert('+ val + '%)';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' invert('+ val + '%)';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmSaturate').off('keyup');
                jQuery('#inpElmSaturate').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('saturate')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'saturate('+ val + ')';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' saturate('+ val + ')';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                   if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmSepia').off('keyup');
                jQuery('#inpElmSepia').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();

                    var sFilter = $elm_selected.get(0).style.filter;
                    sFilter = sFilter.replace('none','');
                    var arr = sFilter.split(" ");

                    var exist=false;
                    for(var i=0;i<arr.length;i++){
                        var s = arr[i];
                        if(s.indexOf('sepia')!=-1){
                            if(!isNaN(val) && val!=''){
                                arr[i] = 'sepia('+ val + '%)';
                            } else {
                                arr[i] = '';
                            }
                            exist=true;
                        }
                    }
                    if(!exist){
                        var sFilter = sFilter + ' sepia('+ val + '%)';
                    } else {
                        var sFilter = '';
                        for(var i=0;i<arr.length;i++){
                            sFilter+= ' ' + arr[i];
                        }
                    }

                    if (jQuery.trim(sFilter) == '') {
                        $elm_selected.css('filter', 'none');
                    } else {
                        $elm_selected.css('filter', sFilter);
                    }

                    jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);
                });

                jQuery('#inpElmAttr1,#inpElmAttr2,#inpElmAttr3,#inpElmAttr4,#inpElmAttr5,#inpElmAttrVal1,#inpElmAttrVal2,#inpElmAttrVal3,#inpElmAttrVal4,#inpElmAttrVal5').off('keyup');
                jQuery('#inpElmAttr1,#inpElmAttr2,#inpElmAttr3,#inpElmAttr4,#inpElmAttr5,#inpElmAttrVal1,#inpElmAttrVal2,#inpElmAttrVal3,#inpElmAttrVal4,#inpElmAttrVal5').on('keyup', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var attrs = {};

                    jQuery.each($elm_selected[0].attributes, function (index, attribute) {
                        attrs[attribute.name] = attribute.value;
                        //$elm_selected.removeAttr(attribute.name);
                    });

                    for (var k in attrs){
                        if (attrs.hasOwnProperty(k)) {
                             if(k!='id' && k!='style' && k!='class' && k!='href' && k!='src' && k!='contenteditable' && k!='data-filename'){
                                $elm_selected.removeAttr(k);
                             }
                        }
                    }

                    if(jQuery('#inpElmAttr1').val()!=''){
                        var attrname = jQuery('#inpElmAttr1').val();
                        var attrvalue = jQuery('#inpElmAttrVal1').val();
                        $elm_selected.attr(attrname,attrvalue);
                    }

                    if(jQuery('#inpElmAttr2').val()!=''){
                        attrname = jQuery('#inpElmAttr2').val();
                        attrvalue = jQuery('#inpElmAttrVal2').val();
                        $elm_selected.attr(attrname,attrvalue);
                    }

                    if(jQuery('#inpElmAttr3').val()!=''){
                        attrname = jQuery('#inpElmAttr3').val();
                        attrvalue = jQuery('#inpElmAttrVal3').val();
                        $elm_selected.attr(attrname,attrvalue);
                    }

                    if(jQuery('#inpElmAttr4').val()!=''){
                        attrname = jQuery('#inpElmAttr4').val();
                        attrvalue = jQuery('#inpElmAttrVal4').val();
                        $elm_selected.attr(attrname,attrvalue);
                    }

                    if(jQuery('#inpElmAttr5').val()!=''){
                        attrname = jQuery('#inpElmAttr5').val();
                        attrvalue = jQuery('#inpElmAttrVal5').val();
                        $elm_selected.attr(attrname,attrvalue);
                    }
                });

                //Animate

                jQuery('#selElmAnim').off('change');
                jQuery('#selElmAnim').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var val = jQuery('#selElmAnim').val();

                    if(val==''){
                        $elm_selected.removeAttr('data-aos');
                    } else {
                        $elm_selected.attr('data-aos',val);

                        jQuery('#btnPreviewAnim').trigger('click');
                    }

                });

                jQuery('#selElmAnimDelay').off('change');
                jQuery('#selElmAnimDelay').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var val = jQuery('#selElmAnimDelay').val();

                    if(val==''){
                        $elm_selected.removeAttr('data-aos-delay');
                    } else {
                        $elm_selected.attr('data-aos-delay',val);
                    }

                });

                jQuery('#selElmAnimDuration').off('change');
                jQuery('#selElmAnimDuration').on('change', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var val = jQuery('#selElmAnimDuration').val();

                    if(val==''){
                        $elm_selected.removeAttr('data-aos-duration');
                    } else {
                        $elm_selected.attr('data-aos-duration',val);
                    }

                });

                jQuery("#chkAnimateOnce").off("click");
                jQuery("#chkAnimateOnce").on('click', function (e) {
                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    if(jQuery("#chkAnimateOnce").prop("checked")){
                        $elm_selected.attr('data-aos-once', 'true');
                    } else {
                        $elm_selected.removeAttr('data-aos-once');
                    }

                });

                jQuery('#btnPreviewAnim').off('click');
                jQuery('#btnPreviewAnim').on('click', function(){

                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                    var animduration = $elm_selected.attr('data-aos-duration');
                    $elm_selected.removeAttr('data-aos-duration'); //can cause preview problem

                    $elm_selected.css('visibility','hidden');
                    AOS.init({
                        duration: 1
                    });
                    $elm_selected.removeClass('aos-init');
                    $elm_selected.removeClass('aos-animate');

                    setTimeout(function () {
                        $elm_selected.css('visibility','');
                        AOS.init({
                            duration: 1200
                        });

                        if(animduration){
                            $elm_selected.attr('data-aos-duration',animduration);
                        }

                    },10);

                });

                jQuery('#inpElmClassName').off('keyup');
                jQuery('#inpElmClassName').on('keyup', function(){
                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    var classnames = val.split(" ");

                    //builder classes
                    var bAddActive = false;
                    if($elm_selected.hasClass('elm-active')){
                        bAddActive = true;
                    }

                    $elm_selected.attr('class', val);//update

                    //builder classes
                    if(bAddActive) $elm_selected.addClass('elm-active');
                    $elm_selected.addClass('elm-inspected');
                });

                jQuery('.elm-editstyle').off('click');
                jQuery('.elm-editstyle').on('click', function(){

                    if(jQuery('#divEditStyle').css('display')=='none'){
                        jQuery('#divEditStyle').addClass('active');
                        jQuery(this).css('border','#aaa 1px solid');
                    } else {
                        jQuery('#divEditStyle').removeClass('active');
                        jQuery(this).css('border','transparent 1px solid');
                    }

                });

                jQuery('#inpElmInlineStyle').off('keyup');
                jQuery('#inpElmInlineStyle').on('keyup', function(){
                    var $elm_selected = jQuery('.elm-list > a.active').data('elm');
                    var val = jQuery(this).val();
                    $elm_selected.attr('style', val);
                });

            });


            //GRID EDITOR
            jQuery('.cell-grideditor').off('click');
            jQuery('.cell-grideditor').on('click', function (e) {

                jQuery('.is-builder').removeAttr('hideoutline');

                var $modal = jQuery('.is-modal.grideditor');
                $modal.addClass('active');
                $modal.css('display','');

                $modal.find('.is-modal-close').off("click");
                $modal.find(".is-modal-close").on('click', function () {
                    $modal.removeClass('active');

                    if(localStorage.getItem("_hiderowcoloutline")=='1'){
                        jQuery('.is-builder').attr('hideoutline','');
                    } else {
                        jQuery('.is-builder').removeAttr('hideoutline');
                    }
                });

            });

            jQuery('.grideditor .row-add').off('click');
            jQuery('.grideditor .row-add').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                jQuery(".cell-add-options").data('mode', 'row');

                //change to row selection
                plugin.hideElementTools();
                jQuery("#divCellTool").css("display", "none");
                jQuery('.cell-active').removeClass('cell-active');
                jQuery('.row-active').removeClass('row-active');
                $block.parent().addClass('row-active');

                var _width = jQuery(".cell-add-options").outerWidth();

                var _top = jQuery(this).offset().top;
                var _left = jQuery(this).offset().left - (_width) - 8;
                jQuery(".cell-add-options").css("top", _top + "px");
                jQuery(".cell-add-options").css("left", _left + "px");
                jQuery(".cell-add-options").css("display", "block");
                jQuery(".cell-add-options").removeClass("arrow-top");
                jQuery(".cell-add-options").removeClass("arrow-left");
                jQuery(".cell-add-options").removeClass("arrow-bottom");
                jQuery(".cell-add-options").removeClass("center");
                jQuery(".cell-add-options").addClass("arrow-right");

            });

            jQuery('.grideditor .row-duplicate').off('click');
            jQuery('.grideditor .row-duplicate').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //Save for Undo
                plugin.saveForUndo();

                plugin.hideElementTools();

                $block.parent().clone().insertBefore($block.parent()).children().removeClass('cell-active');

                plugin.applyBehavior();

                //change to row selection
                jQuery('.cell-active').removeClass('cell-active');
                jQuery('.row-active').removeClass('row-active');
                $block.parent().addClass('row-active');
                jQuery('.row-outline').removeClass('row-outline');
                if($block.parent().children('div').not('.is-row-tool').length > 1) {
                    $block.parent().addClass('row-outline');
                }

                plugin.renderLayoutTool();

                //Trigger Change event
                plugin.settings.onChange();

                //Trigger Render event
                plugin.settings.onRender();

            });

            jQuery('.grideditor .row-up').off('click');
            jQuery('.grideditor .row-up').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //Save for Undo
                plugin.saveForUndo();

                if ($block.parent().prev().length > 0) {
                    $block.parent().insertBefore($block.parent().prev());
                } else {
                    plugin.moveRowToPrevContainer($block.parent());
                }

                plugin.renderLayoutTool(true);
                plugin.checkEmpty();

                //Trigger Change event
                plugin.settings.onChange();

            });

            jQuery('.grideditor .row-down').off('click');
            jQuery('.grideditor .row-down').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //Save for Undo
                plugin.saveForUndo();

                if ($block.parent().next().length > 0) {
                    $block.parent().insertAfter($block.parent().next());
                } else {
                    plugin.moveRowToNextContainer($block.parent());
                }

                plugin.renderLayoutTool(true);
                plugin.checkEmpty();

                //Trigger Change event
                plugin.settings.onChange();

            });

            jQuery('.grideditor .row-remove').off('click');
            jQuery('.grideditor .row-remove').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                //Change to row selection
                plugin.renderLayoutTool(true);

                //show modal
                var $modal = jQuery('.is-modal.delconfirm');
                plugin.showModal($modal, false, true, null);

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    $block.parent().remove();

                    plugin.checkEmpty();

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.hideModal($modal);
                });

            });

            jQuery('.grideditor .row-html').off('click');
            jQuery('.grideditor .row-html').on('click', function (e) {

                plugin.viewRowHtml();

            });

            jQuery('.grideditor .cell-add').off('click');
            jQuery('.grideditor .cell-add').on('click', function (e) {

                var $block = jQuery('#divCellTool').data('active');
                if(!$block) {
                    alert(out('Please select a block'));
                    return;
                }

                jQuery(".cell-add-options").data('mode', 'cell');

                //change to column selection
                jQuery('.cell-active').removeClass('cell-active');
                jQuery('.row-active').removeClass('row-active');
                $block.addClass('cell-active');

                var _width = jQuery(".cell-add-options").outerWidth();

                var _top = jQuery(this).offset().top;
                var _left = jQuery(this).offset().left - (_width) - 8;

                jQuery(".cell-add-options").css("top", _top + "px");
                jQuery(".cell-add-options").css("left", _left + "px");
                jQuery(".cell-add-options").css("display", "block");
                jQuery(".cell-add-options").removeClass("arrow-top");
                jQuery(".cell-add-options").removeClass("arrow-left");
                jQuery(".cell-add-options").removeClass("arrow-bottom");
                jQuery(".cell-add-options").removeClass("center");
                jQuery(".cell-add-options").addClass("arrow-right");

            });


            //RTE

            //View HTML, Preferences, Add Snippet
            //Bold, Italic, Underline
            //Strikethrough, Superscript, Subscript, Uppercase
            jQuery('.cell-viewhtml').off('click');
            jQuery('.cell-viewhtml').on('click', function (e) {

                plugin.viewHtml();

            });

            jQuery('.cell-preferences').off('click');
            jQuery('.cell-preferences').on('click', function (e) {

                if(bIsAppleMobile) {
                    jQuery('.mobile-close').trigger('click');
                }
                plugin.viewConfig();

            });

            jQuery('.cell-addsnippet').off('click');
            jQuery('.cell-addsnippet').on('click', function (e) {

                plugin.viewSnippets();

            });

            jQuery('.cell-undo').off('click');
            jQuery('.cell-undo').on('click', function (e) {

                plugin.doUndo();
                /*
                if(document.queryCommandEnabled('undo')){
                    document.execCommand('undo');
                } else {
                    plugin.doUndo();
                }
                */
            });

            jQuery('.cell-redo').off('click');
            jQuery('.cell-redo').on('click', function (e) {

                plugin.doRedo();
                /*
                if(document.queryCommandEnabled('redo')){
                    document.execCommand('redo');
                } else {
                    plugin.doRedo();
                }
                */
            });

            jQuery('.cell-format').off('click');
            jQuery('.cell-format').on('click', function (e) {

                //plugin.restoreSelection(); //must not used. This makes problem on mobile editing.

                //Save for Undo
                plugin.saveForUndo();

                if (command == 'bold' || command == 'italic' || command == 'underline') {
                    jQuery('.is-pop').css('display', 'none');
                }

                var command = jQuery(e.target).data('command');
                if (!command) command = jQuery(e.target).parent().data('command'); //because button can have span inside

                var text = getSelected();

                try{
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {  //ini text node
                            el = curr.parentNode;
                        } else {
                            el = curr;
                        }
                    }
                    else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement();
                    }
                } catch(e) {return;}

                if (jQuery.trim(text) == '') {
                    if (command == 'bold') {
                        var tagname = jQuery(el).prop("tagName").toLowerCase();
                        if (tagname == 'b') {

                            selectElementContents(el);

                            document.execCommand('bold', false, null);

                        } else {
                            if (jQuery(el).css('font-weight') == 'bold' || jQuery(el).css('font-weight') > 400) {
                                jQuery(el).css('font-weight', '');
                            } else {
                                jQuery(el).css('font-weight', 'bold');
                            }
                        }
                    }
                    if (command == 'italic') {
                        var tagname = jQuery(el).prop("tagName").toLowerCase();
                        if (tagname == 'i') {

                            selectElementContents(el);

                            document.execCommand('italic', false, null);

                        } else {
                            if (jQuery(el).css('font-style') == 'italic') {
                                jQuery(el).css('font-style', '');
                            } else {
                                jQuery(el).css('font-style', 'italic');
                            }
                        }
                    }
                    if (command == 'underline') {
                        var tagname = jQuery(el).prop("tagName").toLowerCase();
                        if (tagname == 'u') {

                            selectElementContents(el);

                            document.execCommand('underline', false, null);

                        } else {
                            if (jQuery(el).css('text-decoration').indexOf('underline') != -1) {
                                jQuery(el).css('text-decoration', '');
                            } else {
                                jQuery(el).css('text-decoration', 'underline');
                            }
                        }
                    }
                    if (command == 'strikethrough') {
                        var tagname = jQuery(el).prop("tagName").toLowerCase();
                        if (tagname == 'strike') {

                            selectElementContents(el);

                            document.execCommand('strikethrough', false, null);

                        } else {
                            if (jQuery(el).css('text-decoration').indexOf('line-through') != -1) {
                                jQuery(el).css('text-decoration', '');
                            } else {
                                jQuery(el).css('text-decoration', 'line-through');
                            }
                        }
                    }
                } else {
                    if (command == 'bold') {
                        document.execCommand('bold', false, null);
                    }
                    if (command == 'italic') {
                        document.execCommand('italic', false, null);
                    }
                    if (command == 'underline') {
                        document.execCommand('underline', false, null);
                    }
                    if (command == 'strikethrough') {
                        document.execCommand('strikethrough', false, null);
                    }
                    if (command == 'superscript') {
                        document.execCommand('superscript', false, null);
                    }
                    if (command == 'subscript') {
                        document.execCommand('subscript', false, null);
                    }
                }

                if (command == 'uppercase') {
                    if (jQuery(el).css('text-transform') == 'uppercase') {
                        jQuery(el).css('text-transform', '');
                    } else {
                        jQuery(el).css('text-transform', 'uppercase');
                    }
                }

                plugin.renderLayoutTool(false, true);

                plugin.getState();

                //save selection (only for desktop)
                if(!bIsAppleMobile) {
                    plugin.saveSelection(); //Needed because after format, a tag is added (ex. <b>,<i>), so, make selection again.
                }

                if (jQuery.trim(text) == '') {
                    plugin.restoreSelection(); //place cursor back after formatting (bold, italic, ...)
                    if(bIsAppleMobile) jQuery(this).focus(); //prevent keyboard open
                }

                //Trigger Change event
                plugin.settings.onChange();
            });

            //More, Text Formatting (Strikethrough, Superscript, Subscript, Uppercase)

            jQuery('.cell-rtemore').off('click');
            jQuery('.cell-rtemore').on('click', function (e) {

                plugin.hideElementTools();

                if(jQuery('.cell-rtemore-options').hasClass('arrow-top')){
                    var _width = jQuery('.cell-rtemore-options').outerWidth();
                    var _left = jQuery(this).offset().left - _width + 52;
                    var _top = jQuery(this).offset().top + 56;
                }
                if(jQuery('.cell-rtemore-options').hasClass('arrow-left')){
                    var _left = jQuery(this).offset().left + 63;
                    var _top = jQuery(this).offset().top ;
                }
                if(jQuery('.cell-rtemore-options').hasClass('arrow-right')){
                    var _width = jQuery('.cell-rtemore-options').outerWidth();
                    var _left = jQuery(this).offset().left - (_width + 10);
                    var _top = jQuery(this).offset().top;
                }
                jQuery('.cell-rtemore-options').css('top', _top + 'px');
                jQuery('.cell-rtemore-options').css('left', _left + 'px');
                jQuery(".cell-rtemore-options").css("display", "block");
            });

            jQuery('.cell-textformat').off('click');
            jQuery('.cell-textformat').on('click', function (e) {

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-textformat-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-textformat-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-textformat-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-textformat-options').css('top', _top + 'px');
                jQuery('.cell-textformat-options').css('left', _left + 'px');
                jQuery(".cell-textformat-options").css("display", "block");
            });

            //Align (Left, Center, Right, Justify)

            jQuery('.cell-align').off('click');
            jQuery('.cell-align').on('click', function (e) {

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-align-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-align-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-align-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-align-options').css('top', _top + 'px');
                jQuery('.cell-align-options').css('left', _left + 'px');
                jQuery(".cell-align-options").css("display", "block");
            });

            jQuery('.cell-align-options button').off('click');
            jQuery('.cell-align-options button').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                plugin.restoreSelection(); //a must
                if(bIsAppleMobile) jQuery(this).focus(); //prevent keyboard open

                var s = jQuery(this).data('align');

                try {
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {  //ini text node
                            el = curr.parentNode;
                        } else {
                            el = curr;
                        }
                    }
                    else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement();
                    }
                } catch(e) { return; }

                if(jQuery(el).css('display')!='inline'){
                    jQuery(el).css('text-align', s);
                } else {
                    var bDone = false;
                    jQuery(el).parents().each(function(){
                        if(jQuery(this).css('display')!='inline' && bDone == false){
                            jQuery(this).css('text-align', s);
                            bDone = true;
                        }
                    });
                }

                plugin.getState();

                //save selection
                plugin.saveSelection();

                //Trigger Change event
                plugin.settings.onChange();
            });

            //Bulleted List & Numbering, Indent & Outdent

            jQuery('.cell-list').off('click');
            jQuery('.cell-list').on('click', function (e) {

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-list-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-list-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-list-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-list-options').css('top', _top + 'px');
                jQuery('.cell-list-options').css('left', _left + 'px');
                jQuery(".cell-list-options").css("display", "block");
            });

            jQuery('.cell-list-options button').off('click');
            jQuery('.cell-list-options button').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                plugin.restoreSelection(); //a must

                //cleanup span with style
                var $block = jQuery('#divCellTool').data('active');
                if(!$block) return;

                $block.find('span').each(function(){
                    jQuery(this).attr('data-keep','');
                });

                var s = jQuery(this).data('action'); //insertUnorderedList, insertOrderedList, indent, outdent
                document.execCommand(s, false, null);

                //cleanup span with style
                var $block = jQuery('#divCellTool').data('active');
                $block.find('span').each(function(){
                    var attr = jQuery(this).attr('data-keep');
                    if (typeof attr !== typeof undefined && attr !== false) {

                    } else {
                        var s = jQuery(this).html();
                        jQuery(this).replaceWith(s);
                    }
                });
                $block.find('span').each(function(){
                    jQuery(this).removeAttr('data-keep');
                });

                plugin.renderLayoutTool(false, true);

                plugin.getState();

                //save selection
                plugin.saveSelection();

                //Trigger Change event
                plugin.settings.onChange();

                if(bIsAppleMobile) jQuery(this).focus(); //prevent keyboard open
            });

            //Colors

            jQuery('.cell-color').off('click');
            jQuery('.cell-color').on('click', function (e) {

                //save selection
                //plugin.saveSelection(); //a must

                plugin.hideElementTools();

                //prepare
                var $dialog = jQuery('.cell-color-options');
                $dialog.find('.more').removeClass('active');
                $dialog.find('.more').removeClass('deactive');

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-color-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-color-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-color-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                $dialog.css('top', _top + 'px');
                $dialog.css('left', _left + 'px');
                $dialog.css("display", "block");

                jQuery('.gradient').css('left', '0px');
                jQuery('.gradient').addClass('gradient-anim');

                $dialog.find('.input-more').off('click');
                $dialog.find('.input-more').on('click', function (e) {
                    if ($dialog.find('.more').hasClass('active')) {
                        $dialog.find('.more').removeClass('active');
                        $dialog.find('.more').addClass('deactive');
                    } else {
                        $dialog.find('.more').addClass('active');
                        $dialog.find('.more').removeClass('deactive');
                    }
                });
                $dialog.find('.input-mode').off('click');
                $dialog.find('.input-mode').on('click', function (e) {
                    $dialog.find('.input-mode').removeClass('active');
                    jQuery(this).addClass('active');
                    var mode = jQuery(this).data('mode');
                    jQuery('.cell-color-options').data('mode', mode);

                    jQuery('.cell-color-options .more input[type=text]').val('');
                    jQuery('.cell-color-options .more .is-color-preview').css('background-color', '');
                    jQuery('.cell-color-options .more .is-color-preview').attr('data-color', '');
                });

            });

            jQuery('.cell-color-options button').not('.input-more,.input-mode').off('click');
            jQuery('.cell-color-options button').not('.input-more,.input-mode').on('click', function (e) {

                plugin.restoreSelection(); //a must

                var base = jQuery(this).attr('data-color');
                var mode = jQuery('.cell-color-options').data('mode'); //forecolor or backcolor

                //Show gradient
                if (!jQuery(e.target).hasClass('clear') && !jQuery(e.target).hasClass('input-ok') && jQuery(e.target).parents('.input-ok').length == 0 && base != '#ffffff' && base != '#000000') {

                    jQuery('.gradient').removeClass('gradient-anim');

                    if(jQuery(e.target).parents('.gradient').length>0){
                        var _left = parseInt(jQuery('.gradient').css('left'));
                        _left = _left-180;
                        if(_left<=-315)_left=-315;
                        jQuery('.gradient').css('left', _left + 'px');
                    } else {
                        jQuery('.gradient').css('left', '0px');
                    }

                    if(jQuery(e.target).parents('.gradient').length==0){

                        var color;
                        prevcolor = '';
                        for (i = 0; i <= 13; i++) {

                            var percent;
                            if(i==0) percent = -60;
                            if(i==1) percent = -30;
                            if(i==2) percent = 0;
                            if(i==3) percent = 30;
                            if(i==4) percent = 50;
                            if(i==5) percent = 70;
                            if(i==6) percent = 90;
                            if(i==7) percent = 100;
                            if(i==8) percent = 110;
                            if(i==9) percent = 120;
                            if(i==10) percent = 130;
                            if(i==11) percent = 150;
                            if(i==12) percent = 170;
                            if(i==13) percent = 200;
                            if(prevcolor=='#b7b7b7'){
                                color = '#bfbfbf';
                            }
                            else if(prevcolor=='#bfbfbf'){
                                color = '#cbcbcb';
                            }
                            else if(prevcolor=='#cbcbcb'){
                                color = '#d3d3d3';
                            }
                            else if(prevcolor=='#d0d0d0' || prevcolor=='#d3d3d3'){
                                color = '#d9d9d9';
                            }
                            else if(prevcolor=='#d9d9d9' || prevcolor=='#dadada'){
                                color = '#e3e3e3';
                            }
                            else if(prevcolor=='#e3e3e3' || prevcolor=='#e4e4e4'){
                                color = '#eaeaea';
                            }
                            else if(prevcolor=='#eaeaea'){
                                color = '#efefef';
                            }
                            else if(prevcolor=='#efefef'){
                                color = '#f3f3f3';
                            }
                            else if(prevcolor=='#f3f3f3'){
                                color = '#f8f8f8';
                            }
                            else if(prevcolor=='#f8f8f8'){
                                color = '#fafafa';
                            }
                            else if(prevcolor=='#fafafa'){
                                color = '#fcfcfc';
                            }
                            else if(prevcolor=='#fcfcfc'){
                                color = '#fdfdfd';
                            }
                            else if(prevcolor=='#fdfdfd'){
                                color = '#fefefe';
                            }
                            else if(prevcolor=='#fefefe'){
                                color = '#ffffff';
                            } else {
                                color = plugin.LightenDarkenColor(base, percent);
                            }
                            prevcolor = color;
                            //var percent = (i-2) * 20; //Make percentage darken/lighten color from -40 to 100
                            var $button = jQuery(e.target).parent().parent().find('.gradient button:eq(' + i + ')');
                            //$button.html(color)
                            $button.attr('data-color', color);
                            $button.css('background-color', color);
                            $button.css('border', color + ' 1px solid');
                        }
                    }

                }

                if (jQuery(e.target).hasClass('input-ok') || jQuery(e.target).parents('.input-ok').length>0) {
                    base = jQuery('.cell-color-options .more input[type=text]').val();
                    jQuery('.cell-color-options .more .is-color-preview').css('background-color', base);
                    jQuery('.cell-color-options .more .is-color-preview').attr('data-color', base);
                } else {
                    jQuery('.cell-color-options .more input[type=text]').val(base);
                    jQuery('.cell-color-options .more .is-color-preview').css('background-color', base);
                    jQuery('.cell-color-options .more .is-color-preview').attr('data-color', base);
                }

                //Save for Undo
                plugin.saveForUndo();

                var text = getSelected();

                try{
                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {  //ini text node
                            el = curr.parentNode;
                        } else {
                            el = curr;
                        }
                    }
                    else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement();
                    }
                } catch(e) {}

                if (jQuery.trim(text) == '') {
                    if (mode == 'forecolor') {
                        jQuery(el).css('color', base);
                    } else {
                        jQuery(el).css('background-color', base);
                    }
                } else {

                    if (jQuery(el).text() == text) {
                        if (mode == 'forecolor') {
                            jQuery(el).css('color', base);
                        } else {
                            jQuery(el).css('background-color', base);
                        }
                    } else {
                        if (mode == 'forecolor') {
                            document.execCommand('ForeColor', false, base);
                        } else {
                            document.execCommand('BackColor', false, base);
                        }

                        //Cleanup FONTs
                        var fontElements = document.getElementsByTagName("font");
                        for (var i = 0, len = fontElements.length; i < len; ++i) {
                            var s = fontElements[i].color;
                            if (s != '') {
                                if (mode == 'forecolor') {
                                    fontElements[i].removeAttribute("color");
                                    fontElements[i].style.color = s;
                                    if(bIsAppleMobile) jQuery(fontElements[i]).addClass('textblock-active');
                                }
                            }
                        }
                    }
                }

                //save selection
                plugin.saveSelection();

                if(bIsAppleMobile) jQuery(this).focus(); //prevent keyboard open

                //Trigger Change event
                plugin.settings.onChange();

            });

            //Headings/Paragraph

            jQuery('.cell-block').off('click');
            jQuery('.cell-block').on('click', function (e) {

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-block-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-block-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-block-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-block-options').css('top', _top + 'px');
                jQuery('.cell-block-options').css('left', _left + 'px');
                jQuery(".cell-block-options").css("display", "block");
            });

            jQuery('.cell-block-options > div > div').off('click');
            jQuery('.cell-block-options > div > div').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                plugin.restoreSelection(); //a must

                var s = jQuery(this).data('block'); //h1, h2, h3, h4, p, pre
                document.execCommand('formatBlock', false, '<' + s + '>'); //Needs contenteditable.

                plugin.renderLayoutTool();

                plugin.getState();

                //save selection
                plugin.saveSelection();

                //Trigger Change event
                plugin.settings.onChange();

                jQuery(".cell-block-options").css("display", "none");

                if(bIsAppleMobile) jQuery('.cell-block').focus(); //prevent keyboard open
            });

            //Custom Tags

            jQuery('.cell-tags').off('click');
            jQuery('.cell-tags').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-tag-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-tag-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-tag-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-tag-options').css('top', _top + 'px');
                jQuery('.cell-tag-options').css('left', _left + 'px');
                jQuery(".cell-tag-options").css("display", "block");

                var s = '';
                for (var j = 0; j < plugin.settings.customTags.length; j++) {
                    s+='<button style="width:200px;display:block;" data-value="' + plugin.settings.customTags[j][1] + '"> ' + plugin.settings.customTags[j][0] + ' </button>';
                }
                jQuery('#divCustomTags').html(s);

                jQuery('.cell-tag-options button').off('click');
                jQuery('.cell-tag-options button').click(function(){

                    plugin.restoreSelection(); //a must

                    var val = jQuery(this).data("value");
                    plugin.pasteHtmlAtCaret(val,true);

                    jQuery(".cell-tag-options").css("display", "none");

                    plugin.getState();

                    //save selection
                    plugin.saveSelection();

                    //Trigger Change event
                    plugin.settings.onChange();

                    if(bIsAppleMobile) jQuery('.cell-tags').focus(); //prevent keyboard open
                });
            });

            //Clean Formatting

            jQuery('.cell-clean').off('click');
            jQuery('.cell-clean').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                var text = getSelected();

                try {

                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if (curr.nodeType == 3) {  //ini text node
                            el = curr.parentNode;
                        } else {
                            el = curr;
                        }
                    }
                    else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement();
                    }

                } catch(e) { return; }


                if (jQuery.trim(text) == '') {

                    jQuery(el).attr('style', '');

                } else {

                    if (jQuery(el).text() == text) {

                        jQuery(el).attr('style', '');
                        document.execCommand('removeFormat', false, null);
                        document.execCommand('removeFormat', false, null);

                    } else {

                        document.execCommand('removeFormat', false, null);
                        document.execCommand('removeFormat', false, null);

                    }
                }

                plugin.renderLayoutTool();

                plugin.getState();

                //save selection
                //plugin.saveSelection();

                //Trigger Change event
                plugin.settings.onChange();

                return;
            });

            //Font Family

            jQuery('.cell-fontfamily').off('click');
            jQuery('.cell-fontfamily').on('click', function (e) {

                //save selection
                //plugin.saveSelection(); //a must

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-fontfamily-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-fontfamily-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-fontfamily-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-fontfamily-options').css('top', _top + 'px');
                jQuery('.cell-fontfamily-options').css('left', _left + 'px');
                jQuery(".cell-fontfamily-options").css("display", "block");

                if(jQuery('.cell-fontfamily-options').find('iframe').attr('src') == 'about:blank') {
                    jQuery('.cell-fontfamily-options').find('iframe').attr('src', scriptPath+'fonts.html?11');
                }

                //Get active font
                plugin.getState();
                try{
                    var $contents = jQuery('.cell-fontfamily-options').find('iframe').contents();
                    var $parentDiv = $contents.find('#divFontList');
                    var $innerListItem = $contents.find('.on');
                    $parentDiv.animate({
                        scrollTop: $parentDiv.scrollTop() + $innerListItem.position().top - 7
                    }, 1000);
                } catch(e){}

            });

            //Text Settings (Font Size, Line Height & Letter Spacing)

            jQuery('.cell-textsettings').off('click');
            jQuery('.cell-textsettings').on('click', function (e) {

                //save selection
                //plugin.saveSelection(); //a must

                plugin.hideElementTools();

                var _top = jQuery(this).offset().top + 56;
                var _left = jQuery(this).offset().left + 1;
                if(jQuery('.cell-textsetting-options').hasClass('arrow-left')){
                    _left = _left + 62;
                    _top = _top - 55;
                }
                if(jQuery('.cell-textsetting-options').hasClass('arrow-right')){
                    var w = jQuery('.cell-textsetting-options').outerWidth();
                    _left = _left - (w + 11);
                    _top = _top - 55;
                }
                jQuery('.cell-textsetting-options').css('top', _top + 'px');
                jQuery('.cell-textsetting-options').css('left', _left + 'px');
                jQuery(".cell-textsetting-options").css("display", "block");

                jQuery('.div-font-size button, .div-line-height button, .div-letter-spacing button').off('click');
                jQuery('.div-font-size button, .div-line-height button, .div-letter-spacing button').on('click', function (e) {

                    if(bIsAppleMobile) {
                        jQuery('[contenteditable]').attr('makeeditable','1'); //flag for contenteditable
                        jQuery('[contenteditable]').removeAttr('contenteditable'); //make unedited to prevent keyboard opens on iPad.
                    }
                    plugin.restoreSelection(); //a must
                    if(bIsAppleMobile) {
                        jQuery('[makeeditable]').attr('contenteditable', 'true'); //return back contenteditable
                        jQuery('[makeeditable]').removeAttr('makeeditable'); //remove flag
                    }

                    var s = jQuery(this).data('value'); //- +

                    if (jQuery(e.target).parents('.div-font-size').length>0) {
                        var mode = 1;
                    } else if (jQuery(e.target).parents('.div-line-height').length>0) {
                        var mode = 2;
                    } else {
                        var mode = 3;
                    }

                    if(mode==1 && s=='more') {

                        //save selection
                        //plugin.saveSelection(); //a must

                        //show modal
                        var $modal = jQuery('.is-modal.viewsizes');
                        plugin.showSidePanel($modal);

                        if ($modal.find('iframe').attr('src') == 'about:blank') {
                            $modal.find('iframe').attr('src', scriptPath+'sizes.html?4');
                        }

                        $modal.find('.is-side-close').off("click");
                        $modal.find(".is-side-close").on('click', function () {
                            plugin.hideSidePanel()
                        });

                        return;
                    }

                    var text = getSelected();

                    try {

                        var el;
                        var curr;
                        if (window.getSelection) {
                            curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                            if (curr.nodeType == 3) {  //ini text node
                                el = curr.parentNode;
                            } else {
                                el = curr;
                            }
                        }
                        else if (document.selection) {
                            curr = document.selection.createRange();
                            el = document.selection.createRange().parentElement();
                        }

                    } catch(e) { return; }


                    if (jQuery.trim(text) == '') {

                        if (mode == 1) {

                            //Save for Undo
                            plugin.saveForUndo();

                            var value = parseInt(jQuery(el).css('font-size'));

                            if (jQuery(this).attr('data-value') == '+') {
                                value = value + 1;
                                var s = value + 'px';
                            }
                            if (jQuery(this).attr('data-value') == '-') {
                                value = value - 1;
                                var s = value + 'px';
                            }
                            if (jQuery(this).attr('data-value') == '') {
                                value = value - 1;
                                var s = '';
                            }

                            if(s==''){
                                jQuery(el).css('font-size', s);
                            } else {
                                jQuery(el).css('cssText', jQuery(el).attr('style') + ';font-size: ' + s + ' !important;');
                            }
                        }

                    } else {

                        if (jQuery(el).text() == text) {

                            if (mode == 1) {

                                //Save for Undo
                                plugin.saveForUndo();

                                var value = parseInt(jQuery(el).css('font-size'));
                                if (jQuery(this).attr('data-value') == '+') {
                                    value = value + 1;
                                    var s = value + 'px';
                                }
                                if (jQuery(this).attr('data-value') == '-') {
                                    value = value - 1;
                                    var s = value + 'px';
                                }
                                if (jQuery(this).attr('data-value') == '') {
                                    value = value - 1;
                                    var s = '';
                                }
                                //jQuery(el).css('font-size', s);
                                jQuery(el).css('cssText', jQuery(el).attr('style') + ';font-size: ' + s + ' !important;');
                            }

                        } else {

                            if (mode == 1) {

                                //Save for Undo
                                plugin.saveForUndo();

                                var value = parseInt(jQuery(el).css('font-size'));

                                if (jQuery(this).attr('data-value') == '+') {
                                    value = value + 1;
                                    var s = value + 'px';
                                }
                                if (jQuery(this).attr('data-value') == '-') {
                                    value = value - 1;
                                    var s = value + 'px';
                                }
                                if (jQuery(this).attr('data-value') == '') {
                                    value = value - 1;
                                    var s = '';
                                }

                                document.execCommand("fontSize", false, "7"); //this makes keyboard opens on mobile

                                var fontElements = document.getElementsByTagName("font");
                                for (var i = 0, len = fontElements.length; i < len; ++i) {
                                    if (fontElements[i].size == "7") {
                                        fontElements[i].removeAttribute("size");
                                        //fontElements[i].style.fontSize = s;
                                        //jQuery(fontElements[i]).css('font-size', s);
                                        jQuery(fontElements[i]).css('cssText', jQuery(fontElements[i]).attr('style') + ';font-size: ' + s + ' !important;');
                                        selectElementContents(jQuery(fontElements[i]).get(0));
                                        if(bIsAppleMobile) jQuery(fontElements[i]).addClass('textblock-active');
                                    }
                                }

                            }
                        }
                    }

                    if (mode == 2) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var value = parseInt(jQuery(el).css('line-height'));
                        if (jQuery(this).attr('data-value') == '+') {
                            value = value + 1;
                            var s = value + 'px';
                        }
                        if (jQuery(this).attr('data-value') == '-') {
                            value = value - 1;
                            var s = value + 'px';
                        }
                        if (jQuery(this).attr('data-value') == '') {
                            value = value - 1;
                            var s = '';
                        }
                        jQuery(el).css('line-height', s);
                    }

                    if (mode == 3) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var value = parseInt(jQuery(el).css('letter-spacing'));
                        if (jQuery(this).attr('data-value') == '+') {
                            value = value + 1;
                            var s = value + 'px';
                        }
                        if (jQuery(this).attr('data-value') == '-') {
                            value = value - 1;
                            var s = value + 'px';
                        }
                        if (jQuery(this).attr('data-value') == '') {
                            value = value - 1;
                            var s = '';
                        }
                        jQuery(el).css('letter-spacing', s);
                    }

                    //save selection
                    plugin.saveSelection();

                    if(bIsAppleMobile) jQuery('.cell-textsettings').focus(); //hide keyboard on mobile by focusing outside editable area

                    plugin.renderLayoutTool(false, true);

                    plugin.getState();

                    //Trigger Change event
                    plugin.settings.onChange();

                });

            });

            //Image

            jQuery('.cell-image').off('click');
            jQuery('.cell-image').on('click', function (e) {

                //save selection
                //plugin.saveSelection();

                //prepare modal
                var $modal = jQuery('.is-modal.insertimage');

                //show modal
                plugin.showModal($modal, true, false, function () {
                    if(!bIsAppleMobile) plugin.restoreSelection();
                });

                //Clear previous
                jQuery('#fileInsertImage').clearInputs();
                jQuery('.is-preview-area').hide();
                jQuery('.is-drop-area').show();
		        jQuery('.is-drop-area').removeClass('image-dropping');

                //Clear image source input
                $modal.find('.input-src').val('');

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').click(function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    if(bIsAppleMobile) {
                        jQuery('[contenteditable]').removeAttr('contenteditable'); //make unedited to prevent keyboard opens on iPad.
                    }
                    plugin.restoreSelection(); //a must

                    var val = '';
                    if(jQuery('.is-drop-area').css('display') =='none'){
                        val = jQuery('#imgInsertImagePreview').attr('src');
                    } else {
                        val = $modal.find('.input-src').val();
                    }

                    if(val == '') return;

                    plugin.pasteHtmlAtCaret('<img src="' + val + '" />', false);

                    plugin.hideModal($modal);

                    plugin.applyBehavior();

                    //save selection
                    plugin.saveSelection();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    //if(bIsAppleMobile) jQuery('.cell-image').focus(); //prevent keyboard open - not working here. see above (set contenteditable to false).
                });

                jQuery('#fileInsertImage').off('change');
                jQuery('#fileInsertImage').on('change', function(e){

                    var $modal = jQuery('.is-modal.insertimage');

                    var input = e.target;

                    if (input.files && input.files[0]) {

                        var reader = new FileReader();

                        reader.onload = function(e) {
                            jQuery('.is-drop-area').hide();

                            jQuery('#imgInsertImagePreview').attr('src', e.target.result);
                            jQuery('.is-preview-area').show();

                            jQuery('.image-title').html(input.files[0].name);
                        };

                        reader.readAsDataURL(input.files[0]);

                        $modal.find('.input-src').val(''); //Clear manually specified image soure

                    }

                });

                jQuery('.is-drop-area').off('dragover');
                jQuery('.is-drop-area').on('dragover', function () {
		            jQuery('.is-drop-area').addClass('image-dropping');
	            });

                jQuery('.is-drop-area').off('dragleave');
	            jQuery('.is-drop-area').on('dragleave', function () {
		            jQuery('.is-drop-area').removeClass('image-dropping');
                });

                jQuery('.is-preview-area i').off('click');
                jQuery('.is-preview-area i').click(function(e){
                    jQuery('#fileInsertImage').clearInputs();
                    jQuery('.is-preview-area').hide();
                    jQuery('.is-drop-area').show();
		            jQuery('.is-drop-area').removeClass('image-dropping');
                });

                $modal.find('.input-src').off('keyup');
                $modal.find('.input-src').on('keyup', function () {
                    //Clear drop image area
                    jQuery('#fileInsertImage').clearInputs();
                    jQuery('.is-preview-area').hide();
                    jQuery('.is-drop-area').show();
		            jQuery('.is-drop-area').removeClass('image-dropping');
	            });

                var sFunc = (plugin.settings.onImageSelectClick+'').replace( /\s/g, '');
                if(sFunc != 'function(){}' || plugin.settings.imageselect!=''){

                    $modal.find('.image-src').addClass('image-select');

                    //Open Custom Image Select
                    $modal.find('.input-select').off('click');
                    $modal.find('.input-select').on('click', function (e) {

                        if(sFunc != 'function(){}'){

                            var $modal = jQuery('.is-modal.insertimage');
                            plugin.settings.onImageSelectClick({targetInput: $modal.find('.input-src').get(0), theTrigger: jQuery(this).get(0)});

                        } else {

                            var $modal = jQuery('.is-modal.imageselect');
                            if ($modal.find('iframe').attr('src') == 'about:blank') {
                                $modal.find('iframe').attr('src', plugin.settings.imageselect);
                            }
                            //show modal
                            plugin.showModal($modal);

                        }

                    });

                } else {
                    $modal.find('.image-src').removeClass('image-select');
                }

            });


            //Hyperlink

            jQuery('.cell-link').off('click');
            jQuery('.cell-link').on('click', function (e) {

                var $block = jQuery("#divCellTool").data('active');

                var text = getSelected();

                //Adjust selection: If cursor is on existing link, select the link
                var el;
                var curr;
                if (window.getSelection) {
                    if(window.getSelection().rangeCount==0) return;
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if (curr.nodeType == 3) {  //ini text node
                        el = curr.parentNode;
                    } else {
                        el = curr;
                    }
                    if (el.nodeName.toLowerCase() == 'a') {
                        selectElementContents(el);
                    }
                }
                else if (document.selection) {
                    curr = document.selection.createRange();
                    el = document.selection.createRange().parentElement();
                    if (el.nodeName.toLowerCase() == 'a') {
                        selectElementContents(el);
                    }
                }
                //save selection
                //plugin.saveSelection();

                //prepare modal
                var $modal = jQuery('.is-modal.createlink');

                var sFunc = (plugin.settings.onFileSelectClick+'').replace( /\s/g, '');
                if(sFunc != 'function(){}' || plugin.settings.fileselect!=''){

                    $modal.find('.input-select').css('display', 'block');
                    $modal.find('.input-url').css('width','444px');

                    $modal.find('.input-select').off('click');
                    $modal.find('.input-select').on('click', function (e) {

                        if(sFunc != 'function(){}'){

                            var $modal = jQuery('.is-modal.createlink');
                            plugin.settings.onFileSelectClick({targetInput: $modal.find('.input-url').get(0), theTrigger: jQuery(this).get(0)});

                        } else {

                            var $modal = jQuery('.is-modal.fileselect');
                            if ($modal.find('iframe').attr('src') == 'about:blank') {
                                $modal.find('iframe').attr('src', plugin.settings.fileselect);
                            }
                            //show modal
                            plugin.showModal($modal);

                        }

                    });

                } else {

                    $modal.find('.input-select').css('display', 'none');
                    $modal.find('.input-url').css('width','100%');

                }


                //get values
                var url = '';
                var target = '';
                $modal.find('.input-url').val('');
                $modal.find('.input-newwindow').prop('checked', false);
                $modal.find('.input-title').val('');
                $modal.find('.input-text').val('');
                if (el.nodeName.toLowerCase() == 'a') {
                    url = jQuery(el).attr('href');
                    target = jQuery(el).attr('target');
                    title = jQuery(el).attr('title');
                    linktext = jQuery(el).html();

                    $modal.find('.input-url').val(url);
                    if (target == '_blank') {
                        $modal.find('.input-newwindow').prop('checked', true);
                    } else {
                        $modal.find('.input-newwindow').prop('checked', false);
                    }
                    $modal.find('.input-title').val(title);
                    $modal.find('.input-text').val(linktext);
                } else {
                    $modal.find('.input-text').val(text);
                }

                //show modal
                plugin.showModal($modal, true, false, function () {
                    if(!bIsAppleMobile) plugin.restoreSelection();
                });

                $modal.find('.input-url').trigger('focus'); //must be used here, because this will clear selection => text (from getSelected()) returns empty

                $modal.off('keyup');
                $modal.on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        $modal.find('.input-ok').trigger('click');
                    }
                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    plugin.restoreSelection();

                    var url = $modal.find('.input-url').val();
                    var title = $modal.find('.input-title').val();
                    var linktext = $modal.find('.input-text').val();

                    if (linktext == '') linktext = url;

                    if (url != '') {

                        //Save for Undo
                        plugin.saveForUndo();

                        document.execCommand('createLink', false, 'http://dummy');
                        $activeLink = jQuery("a[href='http://dummy']").first();
                        $activeLink.attr('href', url);

                        if ($modal.find('.input-newwindow').prop('checked')) {
                            $activeLink.attr('target', '_blank');
                        } else {
                            $activeLink.removeAttr('target');
                        }

                        $activeLink.attr('title', title);
                        if($activeLink.html()!=linktext){
                            $activeLink.html(linktext);
                        }

                        var el = $activeLink.get(0);
                        if(!bIsAppleMobile) selectElementContents(el);
                    }

                    plugin.hideModal($modal);

                    //save selection
                    plugin.saveSelection();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    //if(bIsAppleMobile) jQuery('.cell-link').focus(); //prevent keyboard open - not working here, but not needed.
                });

            });

            //Icon

            jQuery('.cell-icon').off('click');
            jQuery('.cell-icon').on('click', function (e) {
                var $block = jQuery("#divCellTool").data('active');

                //save selection
                //plugin.saveSelection(); //a must

                jQuery("#divIconTool").removeAttr('data-active');

                //show modal
                var $modal = jQuery('.is-modal.viewicons');

                $modal.find('#ifrIconInsert').css('display', 'block');
                $modal.find('#ifrIconEdit').css('display', 'none');
                if ($modal.find('#ifrIconInsert').attr('src') == 'about:blank') {
                    $modal.find('#ifrIconInsert').attr('src', plugin.settings.iconselect + '?mode=insert');
                }

                plugin.showSidePanel($modal);

                $modal.find('.is-side-close').off("click");
                $modal.find(".is-side-close").on('click', function () {
                    plugin.hideSidePanel()
                });
            });

            //ELEMENT TOOLS

            //divSpacerTool

            jQuery('#divSpacerTool button').off('click');
            jQuery('#divSpacerTool button').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                var $spacer = jQuery("#divSpacerTool").data('active');

                var val = jQuery(this).data('value');

                if (val == '-') {
                    if ($spacer.hasClass('height-300')) { $spacer.removeClass('height-300'); $spacer.addClass('height-280'); }
                    else if ($spacer.hasClass('height-280')) { $spacer.removeClass('height-280'); $spacer.addClass('height-260'); }
                    else if ($spacer.hasClass('height-260')) { $spacer.removeClass('height-260'); $spacer.addClass('height-240'); }
                    else if ($spacer.hasClass('height-240')) { $spacer.removeClass('height-240'); $spacer.addClass('height-220'); }
                    else if ($spacer.hasClass('height-220')) { $spacer.removeClass('height-220'); $spacer.addClass('height-200'); }
                    else if ($spacer.hasClass('height-200')) { $spacer.removeClass('height-200'); $spacer.addClass('height-180'); }
                    else if ($spacer.hasClass('height-180')) { $spacer.removeClass('height-180'); $spacer.addClass('height-160'); }
                    else if ($spacer.hasClass('height-160')) { $spacer.removeClass('height-160'); $spacer.addClass('height-140'); }
                    else if ($spacer.hasClass('height-140')) { $spacer.removeClass('height-140'); $spacer.addClass('height-120'); }
                    else if ($spacer.hasClass('height-120')) { $spacer.removeClass('height-120'); $spacer.addClass('height-100'); }
                    else if ($spacer.hasClass('height-100')) { $spacer.removeClass('height-100'); $spacer.addClass('height-80'); }
                    else if ($spacer.hasClass('height-80')) { $spacer.removeClass('height-80'); $spacer.addClass('height-60'); }
                    else if ($spacer.hasClass('height-60')) { $spacer.removeClass('height-60'); $spacer.addClass('height-40'); }
                    else if ($spacer.hasClass('height-40')) { $spacer.removeClass('height-40'); $spacer.addClass('height-20'); }
                    else { }
                } else {
                    if ($spacer.hasClass('height-20')) { $spacer.removeClass('height-20'); $spacer.addClass('height-40'); }
                    else if ($spacer.hasClass('height-40')) { $spacer.removeClass('height-40'); $spacer.addClass('height-60'); }
                    else if ($spacer.hasClass('height-60')) { $spacer.removeClass('height-60'); $spacer.addClass('height-80'); }
                    else if ($spacer.hasClass('height-80')) { $spacer.removeClass('height-80'); $spacer.addClass('height-100'); }
                    else if ($spacer.hasClass('height-100')) { $spacer.removeClass('height-100'); $spacer.addClass('height-120'); }
                    else if ($spacer.hasClass('height-120')) { $spacer.removeClass('height-120'); $spacer.addClass('height-140'); }
                    else if ($spacer.hasClass('height-140')) { $spacer.removeClass('height-140'); $spacer.addClass('height-160'); }
                    else if ($spacer.hasClass('height-160')) { $spacer.removeClass('height-160'); $spacer.addClass('height-180'); }
                    else if ($spacer.hasClass('height-180')) { $spacer.removeClass('height-180'); $spacer.addClass('height-200'); }
                    else if ($spacer.hasClass('height-200')) { $spacer.removeClass('height-200'); $spacer.addClass('height-220'); }
                    else if ($spacer.hasClass('height-220')) { $spacer.removeClass('height-220'); $spacer.addClass('height-240'); }
                    else if ($spacer.hasClass('height-240')) { $spacer.removeClass('height-240'); $spacer.addClass('height-260'); }
                    else if ($spacer.hasClass('height-260')) { $spacer.removeClass('height-260'); $spacer.addClass('height-280'); }
                    else if ($spacer.hasClass('height-280')) { $spacer.removeClass('height-280'); $spacer.addClass('height-300'); }
                    else { }
                }

                plugin.renderSpacerTool();

                plugin.renderLayoutTool(false, true);

                //Trigger Change event
                plugin.settings.onChange();
            });

            //divImageTool

            jQuery('#fileEmbedImage').off('change');
            jQuery('#fileEmbedImage').on('change', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                var input = e.target;

                jQuery("#divImageTool").css("display", "none");
                var $img = jQuery("#divImageTool").data('active');
                jQuery("#divImageProgress").css('width', $img.outerWidth());
                jQuery("#divImageProgress").css('height', $img.outerHeight());
                var _top = $img.offset().top;
                var _left = $img.offset().left;
                jQuery("#divImageProgress").css("top", _top + "px");
                jQuery("#divImageProgress").css("left", _left + "px");
                jQuery("#divImageProgress").css("display", "table");
                jQuery("#divImgResizer").css("display", "none");

                //The #fileEmbedImage triggered 2 times in IE (because of clearInputs below). This makes input.files[0].name returns error on 2nd trigger. Just add try{}!
                try{

                    $img.attr('data-filename',input.files[0].name); //needed for saveimage.js |

                    processImage(input.files[0], $img.get(0), function () {

                        jQuery("#divImageProgress").css("display", "none");

                        var $block = jQuery("#divCellTool").data('active');
                        plugin.hideElementTools(); //Incorrect position during image embed, so hide element tool.

                        jQuery('#fileEmbedImage').clearInputs();

                        //Trigger Change event
                        plugin.settings.onChange();
                    });

                } catch(e) {
                    jQuery("#divImageProgress").css("display", "none");

                    var $block = jQuery("#divCellTool").data('active');
                    plugin.hideElementTools(); //Incorrect position during image embed, so hide element tool.
                }
            });


            jQuery('#fileImage').off('change');
            jQuery('#fileImage').on('change', function (e) {

                jQuery("#form-upload-larger svg").addClass('please-wait');

                jQuery('#hidRefId').val(plugin.settings.customval);

                jQuery("#form-upload-larger").submit();
            });


            jQuery('#divImageTool .image-embed').off('click');
            jQuery('#divImageTool .image-embed').on('click', function (e) {

                var sFunc = (plugin.settings.onImageBrowseClick + '').replace(/\s/g, '');
                if (sFunc != 'function(){}') {

                    plugin.settings.onImageBrowseClick();

                    return false;
                }
            });

            jQuery('#divImageTool .image-edit').off('click');
            jQuery('#divImageTool .image-edit').on('click', function (e) {
                var $img = jQuery("#divImageTool").data('active');

                //prepare
                var $modal = jQuery('.is-modal.imageedit');

                //Make image width in cropper dialog = actual image width
                if($img.width()<500){
                    $modal.children('div').not('.is-modal-overlay').css('max-width', '526px');
                    $modal.find('.imageedit-preview').css('width', $img.width() + 'px');
                } else {
                    $modal.children('div').not('.is-modal-overlay').css('max-width', $img.width() + 'px');
                    $modal.find('.imageedit-preview').css('width', '');
                }

                $modal.find('.imageedit-preview').html('');
                $modal.find('.imageedit-preview').append('<img src="" style="max-width:100%"/>');
                $modal.find('.imageedit-preview img').attr('src',$img.attr('src'));
                const image = $modal.find('.imageedit-preview img').first().get(0);
                const cropper = new Cropper(image, {
                    zoomable: false
                });

                //show modal
                plugin.showModal($modal, true);

                $modal.find('.imageedit-crop button').off('click');
                $modal.find('.imageedit-crop button').on('click', function (e) {
                    var aspectRatio = jQuery(this).data('crop-size')*1;
                    cropper.setAspectRatio(aspectRatio);
                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var extension = 'jpg';
                    try{
                        extension = file.substr(($img.attr('data-filename').lastIndexOf('.') +1)).toLowerCase();
                    } catch(e) {}
                    if(extension=='jpg'){
                        var src = cropper.getCroppedCanvas().toDataURL('image/jpeg');
                    } else {
                        var src = cropper.getCroppedCanvas().toDataURL();
                    }

                    $img.attr('src',src);

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.hideModal($modal);
                });
            });

            jQuery('#divImageTool .image-link').off('click');
            jQuery('#divImageTool .image-link').on('click', function (e) {

                // EJedit
                console.log('image link clicked!');
                // bubble_fn_openPopup();
                // EJedit

                var sFunc = (plugin.settings.onImageSettingClick+'').replace( /\s/g, '');
                if(sFunc != 'function(){}'){

                    plugin.settings.onImageSettingClick();

                    return false;
                }

                var $img = jQuery("#divImageTool").data('active');
                var $link;
                if ($img.parent().prop("tagName").toLowerCase() == 'a' && $img.parent().children().length == 1) {
                    $link = $img.parent();
                }

                //prepare
                var $modal = jQuery('.is-modal.imagelink');

                var sFunc = (plugin.settings.onImageSelectClick+'').replace( /\s/g, '');
                if(sFunc != 'function(){}' || plugin.settings.imageselect!=''){

                    $modal.find('.image-src').addClass('image-select');


                    $modal.find('.input-select').off('click');
                    $modal.find('.input-select').on('click', function (e) {

                        if(sFunc != 'function(){}'){

                            var $modal = jQuery('.is-modal.imagelink');
                            plugin.settings.onImageSelectClick({targetInput: $modal.find('.input-src').get(0), theTrigger: jQuery(this).get(0)});

                        } else {

                            var $modal = jQuery('.is-modal.imageselect');
                            if ($modal.find('iframe').attr('src') == 'about:blank') {
                                $modal.find('iframe').attr('src', plugin.settings.imageselect);
                            }
                            //show modal
                            plugin.showModal($modal);

                        }

                    });

                } else {
                    $modal.find('.image-src').removeClass('image-select');
                }

                //get values
                var src = $img.attr('src');
                var title = $img.attr('alt');
                if(src.indexOf('base64') == -1) {
                    $modal.find('.input-src').val(src);
                } else {
                    $modal.find('.input-src').val('[Image Data]');
                }
                $modal.find('.input-title').val(title);

                $modal.find('.input-link').val('');
                $modal.find('.input-newwindow').prop('checked', false);
                if ($link) {
                    var link = $link.attr('href');
                    $modal.find('.input-link').val(link);

                    if (title == '') {
                        title = $link.attr('title');
                        $modal.find('.input-title').val(title);
                    }

                    var target = $link.attr('target');
                    if (target == '_blank') {
                        $modal.find('.input-newwindow').prop('checked', true);
                    } else {
                        $modal.find('.input-newwindow').prop('checked', false);
                    }
                }

                //show modal
                plugin.showModal($modal, true);

                $modal.find('.input-src').trigger('focus'); //must be used here, because this will clear selection => text (from getSelected()) returns empty

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var src = $modal.find('.input-src').val();
                    var title = $modal.find('.input-title').val();
                    var link = $modal.find('.input-link').val();

                    if(src.indexOf('[Image Data]') == -1){
                        $img.attr('src', src);
                    } else  {
                        //no change
                    }

                    $img.attr('alt', title);

                    if (link != '') {

                        if ($link) {
                            $link.attr('href', link);

                            $link.attr('title', title);

                            if ($modal.find('.input-newwindow').prop('checked')) {
                                $link.attr('target', '_blank');
                            } else {
                                $link.removeAttr('target');
                            }
                        } else {
                            //Create link
                            $img.wrap('<a href="#"></a>');

                            $link = $img.parent();

                            $link.attr('href', link);
                            $link.attr('title', title);

                            if ($modal.find('.input-newwindow').prop('checked')) {
                                $link.attr('target', '_blank');
                            } else {
                                $link.removeAttr('target');
                            }
                        }

                        if(link.toLowerCase().indexOf('.jpg')!=-1 || link.toLowerCase().indexOf('.jpeg')!=-1 || link.toLowerCase().indexOf('.png')!=-1 || link.toLowerCase().indexOf('.gif')!=-1) {
                            $link.addClass('is-lightbox');
                        } else {
                            $link.removeClass('is-lightbox');
                        }

                    } else {

                        if ($link) {
                            //Remove link
                            $img.unwrap();
                        }
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    plugin.hideModal($modal);
                });

            });

            jQuery('#divCustomCodeTool > button').off('click');
            jQuery('#divCustomCodeTool > button').on('click', function (e) {

                var $block = jQuery("#divCustomCodeTool").data('active');

                //show modal
                var $modal = jQuery('.is-modal.customcode');
                plugin.showModal($modal, true);

                var html = plugin.readCustomCodeBlock($block);

                $modal.find('.input-customcode').val(html);
                $modal.find('.input-customcode').trigger('focus');

                jQuery('.customcode .cell-html-larger').off('click');
                jQuery('.customcode .cell-html-larger').on('click', function (e) {

                    //used  by larger editor dialog (html.html)
                    jQuery('textarea').removeAttr('data-source-active');
                    jQuery('textarea').removeAttr('data-source-ok');
                    jQuery('textarea').removeAttr('data-source-cancel');
                    jQuery('.customcode textarea').attr('data-source-active','1');
                    jQuery('.customcode textarea').attr('data-source-ok','.customcode .input-ok');
                    jQuery('.customcode textarea').attr('data-source-cancel','.customcode');

                    //show modal
                    var $modal = jQuery('.is-modal.viewhtmllarger');
                    $modal.addClass('active');
                    plugin.showModal($modal);

                    $modal.find('#ifrHtml').attr('src', scriptPath+'html.html?1');

                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var html = $modal.find('.input-customcode').val();

                    plugin.renderCustomCodeBlock($block, html);

                    plugin.applyBehavior();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    plugin.hideModal($modal);

                });

            });

            jQuery('#divCustomModuleTool > button').off('click');
            jQuery('#divCustomModuleTool > button').on('click', function (e) {

                var $block = jQuery("#divCustomModuleTool").data('active');

                //-------- Set a flag to indicate active module -----------
                jQuery("[data-module-active]").removeAttr('data-module-active');
                $block.attr('data-module-active', '1');
                //-------- /Set a flag to indicate active module -----------

                //show modal
                var $modal = jQuery('.is-modal.custommodule');

                var modulename = $block.data('module');

                var moduleDesc = $block.attr('data-module-desc');
                if (moduleDesc) {
                    $modal.find('.is-modal-bar').html(moduleDesc);
                } else {
                    $modal.find('.is-modal-bar').html('Module Settings');
                }

                var w = $block.attr('data-dialog-width');
                if (!w || w == '') {
                    w = '900px';
                }

                var h = $block.attr('data-dialog-height');
                if (!h || h == '') {
                    h = '570px';
                }

                $modal.children('div').first().css('max-width', w);
                $modal.children('div').first().css('height', h);


                //Find editable areas (is-builder) in custom code blocks and save them to data-html-1, data-html-2, and so on.
                jQuery('#tmp_buildercontent').remove();
                jQuery('body').append('<div id="tmp_buildercontent" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>');
                var index = 1;
                $block.find('.is-builder').each(function () {
                    var builderhtml = jQuery(this).html();

                    if(jQuery(this).parents('.slick-cloned').length>0)return;

                    //Cleaning
                    jQuery(this).css('transform','');
                    jQuery(this).removeClass('ui-sortable');
                    jQuery(this).removeClass('connectSortable');

                    jQuery(this).removeAttr('hideoutline');
                    jQuery(this).removeAttr('gridoutline');
                    jQuery(this).removeAttr('draggridoutline');
                    jQuery(this).removeAttr('minimal');
                    jQuery(this).removeAttr('clean');
                    jQuery(this).removeAttr('between-blocks-left');
                    jQuery(this).removeAttr('between-blocks-center');
                    jQuery(this).removeAttr('hideelementhighlight');

                    var $builder = jQuery('#tmp_buildercontent');
                    $builder.html(builderhtml);

                    $builder.find('.elm-active').removeClass('elm-active');
                    $builder.find('.elm-inspected').removeClass('elm-inspected');
                    $builder.find('.cell-active').removeClass('cell-active');
                    $builder.find('.row-active').removeClass('row-active');
                    $builder.find('.row-outline').removeClass('row-outline');
                    //$builder.find('.is-builder').removeClass('is-builder');
                    $builder.find('[contenteditable]').removeAttr('contenteditable');
                    $builder.find("[data-module-active]").removeAttr('data-module-active');
                    $builder.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
                    $builder.find('.ui-sortable-placeholder').remove();
                    $builder.find('.marker').remove();
                    $builder.find('.cloned-handler').remove();
                    $builder.children('div').css('transform','');
                    $builder.find('.is-row-tool').remove();
                    $builder.find('.ovl').remove();
                    $builder.find('.row-add-initial').remove();
                    $builder.find('*[class=""]').removeAttr('class');
                    $builder.find('*[style=""]').removeAttr('style');
                    $builder.find('[data-keep]').removeAttr('data-keep');

                    var builderhtml = $builder.html().trim();
                    builderhtml = builderhtml.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

                    $block.attr('data-html-' + index, encodeURIComponent(builderhtml));
                    index++;
                });


                plugin.showModal($modal, true);

                //if ($modal.find('iframe').attr('src') == 'about:blank') {
                    var d = new Date();
                    $modal.find('iframe').attr('src', plugin.settings.modulePath + modulename + '.html?' + d.getTime()); //always refreshed
                //}

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $block = jQuery("#divCustomCodeTool").data('active');

                    //Save Html (original)
                    $block.attr('data-html', encodeURIComponent(jQuery('#hidContentModuleCode').val()));

                    //Save Settings (original)
                    $block.attr('data-settings', encodeURIComponent(jQuery('#hidContentModuleSettings').val()));

                    //Render (programmatically)
                    //$block.html(jQuery('#hidContentModuleCode').val());
                    plugin.renderCustomCodeBlock($block, jQuery('#hidContentModuleCode').val());

                    plugin.applyBehavior();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    plugin.hideModal($modal);

                });

            });

            jQuery('#divIframeTool .iframe-link').off('click');
            jQuery('#divIframeTool .iframe-link').on('click', function (e) {

                var $divIframe = jQuery("#divIframeTool").data('active');
                var $iframe = $divIframe.find('iframe').first();

                //show modal
                var $modal = jQuery('.is-modal.iframelink');
                plugin.showModal($modal, true);

                //get values
                var src = $iframe.attr('src');
                var embeddedYoutubeRegex = /^.*\/\/www.youtube.com\/embed\//;
                var embeddedVimeoRegex = /^.*\/\/player.vimeo.com\/video\//;

                if (embeddedYoutubeRegex.exec(src) != null || embeddedVimeoRegex.exec(src) != null) {

                    $modal.find('.input-embedcode').css('display', 'none');
                    $modal.find('.input-src').css('display', 'block');
                    $modal.find('.input-src').val(src);
                    $modal.find('.input-src').trigger('focus');

                    $modal.find('.input-ok').off('click');
                    $modal.find('.input-ok').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var src = $modal.find('.input-src').val();

                        var youRegex = /^http[s]?:\/\/(((www.youtube.com\/watch\?(feature=player_detailpage&)?)v=)|(youtu.be\/))([^#\&\?]*)/;
                        var vimeoRegex = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/)|(video\/))?([0-9]+)\/?/;
                        var youRegexMatches = youRegex.exec(src);
                        var vimeoRegexMatches = vimeoRegex.exec(src);
                        if (youRegexMatches != null || vimeoRegexMatches != null) {
                            if (youRegexMatches != null && youRegexMatches.length >= 7) {
                                var youMatch = youRegexMatches[6];
                                src = '//www.youtube.com/embed/' + youMatch + '?rel=0';
                            }
                            if (vimeoRegexMatches != null && vimeoRegexMatches.length >= 7) {
                                var vimeoMatch = vimeoRegexMatches[6];
                                src = '//player.vimeo.com/video/' + vimeoMatch;
                            }
                            $iframe.attr('src', src);
                        } else {
                            $iframe.attr('src', src);
                        }

                        //Trigger Change event
                        plugin.settings.onChange();

                        plugin.hideModal($modal);
                    });

                } else {

                    $modal.find('.input-src').css('display', 'none');
                    $modal.find('.input-embedcode').css('display', 'block');
                    $modal.find('.input-embedcode').val($iframe[0].outerHTML);

                    $modal.find('.input-ok').off('click');
                    $modal.find('.input-ok').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var embedcode = $modal.find('.input-embedcode').val();

                        if (embedcode != '') {
                            $iframe.replaceWith(embedcode);
                        }

                        plugin.applyBehavior();

                        //Trigger Change event
                        plugin.settings.onChange();

                        plugin.hideModal($modal);

                    });

                }

            });

            //divTableTool

            jQuery('#divTableTool button').off('click');
            jQuery('#divTableTool button').on('click', function (e) {

                var $modal = jQuery('.is-modal.edittable');
                plugin.showModal($modal);

                //Initial Values

                jQuery('#selCellBorderWidth').val(0);
                jQuery('#selTableApplyTo').val('table');

                //Table Styles

                jQuery(".input-table-bgcolor").off("click");
                jQuery(".input-table-bgcolor").on('click', function () {

                    plugin.pickColor(function (color) {

                        jQuery('#inpCellBgColor').val(color);

                        var $activeCell = jQuery("#divTableTool").data('active');

                        //Apply format
                        var applyto = jQuery('#selTableApplyTo').val();
                        var oTable = $activeCell.parents('table').first()[0];
                        var oRow = $activeCell.parents('tr').first()[0];
                        var oCell = $activeCell[0];

                        if (applyto == 'currentcell') {
                            $activeCell.css('background-color', color);
                        }
                        for (var i = 0; i < oTable.rows.length; i++) {
                            var oTR = oTable.rows[i];
                            for (var j = 0; j < oTR.cells.length; j++) {
                                var oTD = oTR.cells[j];

                                if (applyto == 'table') {
                                    jQuery(oTD).css('background-color', color);
                                }
                                if (applyto == 'evenrows' && isEven(i + 1)) {//even=genap
                                    jQuery(oTD).css('background-color', color);
                                }
                                if (applyto == 'oddrows' && !isEven(i + 1)) {
                                    jQuery(oTD).css('background-color', color);
                                }
                                if (applyto == 'currentrow' && oTR == $activeCell.parents('tr').first()[0] ) {
                                    jQuery(oTD).css('background-color', color);
                                }
                                if (applyto == 'currentcol' && j == getCellIndex(oTable, oRow, oCell)) {
                                    jQuery(oTD).css('background-color', color);
                                }
                            }
                        }

                    }, jQuery('#inpCellBgColor').val());

                });

                jQuery(".input-table-textcolor").off("click");
                jQuery(".input-table-textcolor").on('click', function () {

                    plugin.pickColor(function (color) {

                        jQuery('#inpCellTextColor').val(color);

                        var $activeCell = jQuery("#divTableTool").data('active');

                        //Apply format
                        var applyto = jQuery('#selTableApplyTo').val();
                        var oTable = $activeCell.parents('table').first()[0];
                        var oRow = $activeCell.parents('tr').first()[0];
                        var oCell = $activeCell[0];

                        if (applyto == 'currentcell') {
                            $activeCell.css('color', color);
                        }
                        for (var i = 0; i < oTable.rows.length; i++) {
                            var oTR = oTable.rows[i];
                            for (var j = 0; j < oTR.cells.length; j++) {
                                var oTD = oTR.cells[j];

                                if (applyto == 'table') {
                                    jQuery(oTD).css('color', color);
                                }
                                if (applyto == 'evenrows' && isEven(i + 1)) {//even=genap
                                    jQuery(oTD).css('color', color);
                                }
                                if (applyto == 'oddrows' && !isEven(i + 1)) {
                                    jQuery(oTD).css('color', color);
                                }
                                if (applyto == 'currentrow' && oTR == $activeCell.parents('tr').first()[0] ) {
                                    jQuery(oTD).css('color', color);
                                }
                                if (applyto == 'currentcol' && j == getCellIndex(oTable, oRow, oCell)) {
                                    jQuery(oTD).css('color', color);
                                }
                            }
                        }

                    }, jQuery('#inpCellTextColor').val());

                });

                jQuery(".input-table-bordercolor").off("click");
                jQuery(".input-table-bordercolor").on('click', function () {

                    plugin.pickColor(function (color) {

                        jQuery('#inpCellBorderColor').val(color);

                        var $activeCell = jQuery("#divTableTool").data('active');

                        var borderwidth = jQuery('#selCellBorderWidth').val();
                        if(borderwidth=='0'){
                            jQuery('#selCellBorderWidth').val(1);
                            borderwidth = 1;
                        }

                        //Apply format
                        var applyto = jQuery('#selTableApplyTo').val();
                        var oTable = $activeCell.parents('table').first()[0];
                        var oRow = $activeCell.parents('tr').first()[0];
                        var oCell = $activeCell[0];

                        if (applyto == 'currentcell') {
                            $activeCell.css('border-color', color);
                            $activeCell.css('border-width', borderwidth+'px');
                            $activeCell.css('border-style', 'solid');
                        }
                        for (var i = 0; i < oTable.rows.length; i++) {
                            var oTR = oTable.rows[i];
                            for (var j = 0; j < oTR.cells.length; j++) {
                                var oTD = oTR.cells[j];

                                if (applyto == 'table') {
                                    jQuery(oTD).css('border-color', color);
                                    jQuery(oTD).css('border-width', borderwidth+'px');
                                    jQuery(oTD).css('border-style', 'solid');
                                }
                                if (applyto == 'evenrows' && isEven(i + 1)) {//even=genap
                                    jQuery(oTD).css('border-color', color);
                                    jQuery(oTD).css('border-width', borderwidth+'px');
                                    jQuery(oTD).css('border-style', 'solid');
                                }
                                if (applyto == 'oddrows' && !isEven(i + 1)) {
                                    jQuery(oTD).css('border-color', color);
                                    jQuery(oTD).css('border-width', borderwidth+'px');
                                    jQuery(oTD).css('border-style', 'solid');
                                }
                                if (applyto == 'currentrow' && oTR == $activeCell.parents('tr').first()[0] ) {
                                    jQuery(oTD).css('border-color', color);
                                    jQuery(oTD).css('border-width', borderwidth+'px');
                                    jQuery(oTD).css('border-style', 'solid');
                                }
                                if (applyto == 'currentcol' && j == getCellIndex(oTable, oRow, oCell)) {
                                    jQuery(oTD).css('border-color', color);
                                    jQuery(oTD).css('border-width', borderwidth+'px');
                                    jQuery(oTD).css('border-style', 'solid');
                                }
                            }
                        }

                    }, jQuery('#inpCellBorderColor').val());

                });

                jQuery('#selCellBorderWidth').off('change');
                jQuery('#selCellBorderWidth').on('change', function(){

                    //Save for Undo
                    plugin.saveForUndo();

                    var val = jQuery('#selCellBorderWidth').val();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var bordercolor = jQuery('#inpCellBorderColor').val();

                    if(bordercolor==''){
                        jQuery('#inpCellBorderColor').val('rgb(0, 0, 0)');
                        jQuery('#inpCellBorderColor').css('background-color', 'rgb(0, 0, 0)' );
                        jQuery('#inpCellBorderColor').css('color', '#ddd' );
                        bordercolor = 'rgb(0, 0, 0)';
                    }

                    //Apply format
                    var applyto = jQuery('#selTableApplyTo').val();
                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];
                    var oCell = $activeCell[0];

                    if (applyto == 'currentcell') {
                        $activeCell.css('border-width', val+'px');
                        $activeCell.css('border-style', 'solid');
                        $activeCell.css('border-color', bordercolor);
                        if(val=='0'){
                            $activeCell.css('border-width', '');
                            $activeCell.css('border-style', '');
                            $activeCell.css('border-color', '');

                            jQuery('#inpCellBorderColor').val('');
                            jQuery('#inpCellBorderColor').css('background-color', '' );
                        }
                    }
                    for (var i = 0; i < oTable.rows.length; i++) {
                        var oTR = oTable.rows[i];
                        for (var j = 0; j < oTR.cells.length; j++) {
                            var oTD = oTR.cells[j];

                            if (applyto == 'table') {
                                jQuery(oTD).css('border-width', val+'px');
                                jQuery(oTD).css('border-style', 'solid');
                                jQuery(oTD).css('border-color', bordercolor);
                                if(val=='0'){
                                    jQuery(oTD).css('border-width', '');
                                    jQuery(oTD).css('border-style', '');
                                    jQuery(oTD).css('border-color', '');

                                    jQuery('#inpCellBorderColor').val('');
                                    jQuery('#inpCellBorderColor').css('background-color', '' );
                                }
                            }
                            if (applyto == 'evenrows' && isEven(i + 1)) {//even=genap
                                jQuery(oTD).css('border-width', val+'px');
                                jQuery(oTD).css('border-style', 'solid');
                                jQuery(oTD).css('border-color', bordercolor);
                                if(val=='0'){
                                    jQuery(oTD).css('border-width', '');
                                    jQuery(oTD).css('border-style', '');
                                    jQuery(oTD).css('border-color', '');

                                    jQuery('#inpCellBorderColor').val('');
                                    jQuery('#inpCellBorderColor').css('background-color', '' );
                                }
                            }
                            if (applyto == 'oddrows' && !isEven(i + 1)) {
                                jQuery(oTD).css('border-width', val+'px');
                                jQuery(oTD).css('border-style', 'solid');
                                jQuery(oTD).css('border-color', bordercolor);
                                if(val=='0'){
                                    jQuery(oTD).css('border-width', '');
                                    jQuery(oTD).css('border-style', '');
                                    jQuery(oTD).css('border-color', '');

                                    jQuery('#inpCellBorderColor').val('');
                                    jQuery('#inpCellBorderColor').css('background-color', '' );
                                }
                            }
                            if (applyto == 'currentrow' && oTR == $activeCell.parents('tr').first()[0] ) {
                                jQuery(oTD).css('border-width', val+'px');
                                jQuery(oTD).css('border-style', 'solid');
                                jQuery(oTD).css('border-color', bordercolor);
                                if(val=='0'){
                                    jQuery(oTD).css('border-width', '');
                                    jQuery(oTD).css('border-style', '');
                                    jQuery(oTD).css('border-color', '');

                                    jQuery('#inpCellBorderColor').val('');
                                    jQuery('#inpCellBorderColor').css('background-color', '' );
                                }
                            }
                            if (applyto == 'currentcol' && j == getCellIndex(oTable, oRow, oCell)) {
                                jQuery(oTD).css('border-width', val+'px');
                                jQuery(oTD).css('border-style', 'solid');
                                jQuery(oTD).css('border-color', bordercolor);
                                if(val=='0'){
                                    jQuery(oTD).css('border-width', '');
                                    jQuery(oTD).css('border-style', '');
                                    jQuery(oTD).css('border-color', '');

                                    jQuery('#inpCellBorderColor').val('');
                                    jQuery('#inpCellBorderColor').css('background-color', '' );
                                }
                            }
                        }
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                });

                //Table Layout

                jQuery('[data-table-cmd="rowabove"]').off('click');
                jQuery('[data-table-cmd="rowabove"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];

                    var oNewRow = oTable.insertRow(oRow.rowIndex);

                    for (var i = 0; i < oRow.cells.length; i++) {
                        var oNewCell = oNewRow.insertCell(oNewRow.cells.length);
                        jQuery(oNewCell).attr('style', $activeCell.attr('style'));
                        jQuery(oNewCell).attr('valign', 'top');
                        jQuery(oNewCell).html('<br>');
                    }

                    //Trigger Change event
                    plugin.settings.onChange();
                });

                jQuery('[data-table-cmd="rowbelow"]').off('click');
                jQuery('[data-table-cmd="rowbelow"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];

                    var oNewRow = oTable.insertRow(oRow.rowIndex + 1);

                    for (var i = 0; i < oRow.cells.length; i++) {
                        var oNewCell = oNewRow.insertCell(oNewRow.cells.length);
                        jQuery(oNewCell).attr('style', $activeCell.attr('style'));
                        jQuery(oNewCell).attr('valign', 'top');
                        jQuery(oNewCell).html('<br>');
                    }

                    //Trigger Change event
                    plugin.settings.onChange();
                });

                jQuery('[data-table-cmd="columnleft"]').off('click');
                jQuery('[data-table-cmd="columnleft"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];
                    var oCell = $activeCell[0];

                    var nCellIndex = oCell.cellIndex;

                    for (var i = 0; i < oTable.rows.length; i++) {
                        var oRowTmp = oTable.rows[i];
                        var oNewCell = oRowTmp.insertCell(nCellIndex);
                        jQuery(oNewCell).attr('style', $activeCell.attr('style'));
                        jQuery(oNewCell).attr('valign', 'top');
                        jQuery(oNewCell).html('<br>');
                    }

                    //Trigger Change event
                    plugin.settings.onChange();
                });

                jQuery('[data-table-cmd="columnright"]').off('click');
                jQuery('[data-table-cmd="columnright"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];
                    var oCell = $activeCell[0];

                    var nCellIndex = oCell.cellIndex;

                    for (var i = 0; i < oTable.rows.length; i++) {
                        var oRowTmp = oTable.rows[i];
                        var oNewCell = oRowTmp.insertCell(nCellIndex + 1);
                        jQuery(oNewCell).attr('style', $activeCell.attr('style'));
                        jQuery(oNewCell).attr('valign', 'top');
                        jQuery(oNewCell).html('<br>');
                    }

                    //Trigger Change event
                    plugin.settings.onChange();
                });

                jQuery('[data-table-cmd="delrow"]').off('click');
                jQuery('[data-table-cmd="delrow"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];

                    oTable.deleteRow(oRow.rowIndex);

                    $activeCell = null;

                    if (oTable.rows.length == 0) {
                        oTable.parentNode.removeChild(oTable);
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.hideModal($modal);
                });

                jQuery('[data-table-cmd="delcolumn"]').off('click');
                jQuery('[data-table-cmd="delcolumn"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];
                    var oCell = $activeCell[0];

                    var nCellIndex = oCell.cellIndex;
                    for (var i = 0; i < oTable.rows.length; i++) oTable.rows[i].deleteCell(nCellIndex);

                    $activeCell = null;

                    if (oTable.rows[0].cells.length == 0) {
                        oTable.parentNode.removeChild(oTable);
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.hideModal($modal);
                });

                jQuery('[data-table-cmd="mergecell"]').off('click');
                jQuery('[data-table-cmd="mergecell"]').click(function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var $activeCell = jQuery("#divTableTool").data('active');

                    var oTable = $activeCell.parents('table').first()[0];
                    var oRow = $activeCell.parents('tr').first()[0];
                    var oCell = $activeCell[0];

                    oCell.colSpan = oCell.colSpan + 1; /*TODO: Merge 2 cell which has already colspan.*/

                    if (oCell.cellIndex + 1 < oTable.rows[oRow.rowIndex].cells.length) {
                        oTable.rows[oRow.rowIndex].deleteCell(oCell.cellIndex + 1);
                    }

                    //Trigger Change event
                    plugin.settings.onChange();
                });

            });

            //divLinkTool

            jQuery('#divLinkTool button.link-duplicate').off('click');
            jQuery('#divLinkTool button.link-duplicate').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                var $link = jQuery("#divLinkTool").data('active');

                $link.parent().clone().insertBefore($link.parent()).children().first().css('margin-right', '12px');

                plugin.renderLinkTool();

                //Trigger Change event
                plugin.settings.onChange();

                //Trigger Render event
                plugin.settings.onRender();
            });

            jQuery('#divLinkTool button.link-remove').off('click');
            jQuery('#divLinkTool button.link-remove').on('click', function (e) {

                var $block = jQuery("#divCellTool").data('active');
                var $row = $block.parent();
                var $div;

                //Save for Undo
                plugin.saveForUndo();

                var $link = jQuery("#divLinkTool").data('active');
                if($link.parents('div.elm-active').length>0) var $div = $link.parents('div.elm-active').first();
                if ($link.parent().prop("tagName").toLowerCase() == 'span' && $link.parent().children().length == 1) {
                    $link.parent().remove();
                    if($div) {
                        if($div.children().length==0) $div.remove();
                    }
                }

                if ($block.children().length == 0) {
                    //Del cell

                    if ($row.children().not('.is-row-tool').length == 1) {

                        $row.remove();

                        plugin.checkEmpty();

                    } else {
                        $block.remove();

                        plugin.checkEmpty();

                        //fix layout
                        plugin.fixLayout($row);
                    }
                }

                //Hide tools
                plugin.hideElementTools();
                jQuery('#divCellTool').css('display', 'none');
                jQuery('#divRowAddTool').css('display', 'none');
                jQuery(".is-row-tool").css("display", "");
                jQuery('.row-active').removeClass('row-active');
                jQuery('.row-outline').removeClass('row-outline');
                jQuery('.cell-active').removeClass('cell-active');

                //Trigger Change event
                plugin.settings.onChange();

                jQuery("#divLinkTool").css('display', 'none');

            });

            jQuery('#divLinkTool button.link-edit').off('click');
            jQuery('#divLinkTool button.link-edit').on('click', function (e) {

                var $link = jQuery("#divLinkTool").data('active');

                var isbutton = false;
                if ($link.css('display') != 'inline') {
                    isbutton = true;
                }

                var $modal = jQuery('.is-modal.createlink');

                var sFunc = (plugin.settings.onFileSelectClick+'').replace( /\s/g, '');
                if(sFunc != 'function(){}' || plugin.settings.fileselect!=''){

                    $modal.find('.input-select').css('display', 'block');
                    $modal.find('.input-url').css('width','444px');

                    $modal.find('.input-select').off('click');
                    $modal.find('.input-select').on('click', function (e) {

                        if(sFunc != 'function(){}'){

                            var $modal = jQuery('.is-modal.createlink');
                            plugin.settings.onFileSelectClick({targetInput: $modal.find('.input-url').get(0), theTrigger: jQuery(this).get(0)});

                        } else {

                            var $modal = jQuery('.is-modal.fileselect');
                            if ($modal.find('iframe').attr('src') == 'about:blank') {
                                $modal.find('iframe').attr('src', plugin.settings.fileselect);
                            }
                            //show modal
                            plugin.showModal($modal);

                        }

                    });

                } else {

                    $modal.find('.input-select').css('display', 'none');
                    $modal.find('.input-url').css('width','100%');

                }


                //prepare modal

                //get values
                var url = '';
                var target = '';
                $modal.find('.input-url').val('');
                $modal.find('.input-newwindow').prop('checked', false);
                $modal.find('.input-title').val('');
                $modal.find('.input-text').val('');
                url = $link.attr('href');
                target = $link.attr('target');
                title = $link.attr('title');
                linktext = $link.html();
                $modal.find('.input-url').val(url);
                if (target == '_blank') {
                    $modal.find('.input-newwindow').prop('checked', true);
                } else {
                    $modal.find('.input-newwindow').prop('checked', false);
                }
                $modal.find('.input-title').val(title);
                $modal.find('.input-text').val(linktext);

                //show modal
                plugin.showModal($modal, true);

                $modal.find('.input-url').trigger('focus'); //must be used here, because this will clear selection => text (from getSelected()) returns empty

                $modal.off('keyup');
                $modal.on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        $modal.find('.input-ok').trigger('click');
                    }
                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var url = $modal.find('.input-url').val();
                    var title = $modal.find('.input-title').val();
                    var linktext = $modal.find('.input-text').val();

                    if (linktext == '') linktext = url;

                    if (url != '') {
                        $link.attr('href', url);

                        if ($modal.find('.input-newwindow').prop('checked')) {
                            $link.attr('target', '_blank');
                        } else {
                            $link.removeAttr('target');
                        }

                        $link.attr('title', title);
                        $link.html(linktext);
                    } else {
                        var el = $link.get(0);
                        selectElementContents(el);
                        document.execCommand('unlink', false, null);
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.hideModal($modal);
                });

            });

            //divIconTool

            jQuery('#divIconTool button.icon-type').off('click');
            jQuery('#divIconTool button.icon-type').on('click', function (e) {
                var $icon = jQuery("#divIconTool").data('active');

                //show modal
                var $modal = jQuery('.is-modal.viewicons');

                $modal.find('#ifrIconInsert').css('display', 'none');
                $modal.find('#ifrIconEdit').css('display', 'block');
                if ($modal.find('#ifrIconEdit').attr('src') == 'about:blank') {
                    $modal.find('#ifrIconEdit').attr('src', plugin.settings.iconselect + '?mode=edit');
                }

                plugin.showSidePanel($modal);

                $modal.find('.is-side-close').off("click");
                $modal.find(".is-side-close").on('click', function () {
                    plugin.hideSidePanel()
                });
            });

            jQuery('#divIconTool button.icon-add').off('click');
            jQuery('#divIconTool button.icon-add').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                var $icon = jQuery("#divIconTool").data('active');
                var $link = $icon.parent();

                $link.clone().insertBefore($link);

                plugin.renderIconTool();

                //Trigger Change event
                plugin.settings.onChange();

                //Trigger Render event
                plugin.settings.onRender();
            });

            jQuery('#divIconTool button.icon-remove').off('click');
            jQuery('#divIconTool button.icon-remove').on('click', function (e) {

                //Save for Undo
                plugin.saveForUndo();

                var $icon = jQuery("#divIconTool").data('active');
                if ($icon.parent().prop("tagName").toLowerCase() == 'a' && $icon.parent().children().length == 1) {
                    //link icon
                    var $link = $icon.parent();
                    $link.remove();
                } else {

                    //$icon.remove();

                    //parent is another element (still inside cell)
                    if($icon.parent()[0].innerHTML==$icon[0].outerHTML) {
                        $icon.parent().remove();
                    } else {
                        $icon.remove();
                    }
                }

                plugin.hideElementTools();

                //Trigger Change event
                plugin.settings.onChange();

                jQuery("#divIconTool").css('display', 'none');
            });

            jQuery('#divIconTool button.icon-link').off('click');
            jQuery('#divIconTool button.icon-link').on('click', function (e) {

                var $icon = jQuery("#divIconTool").data('active');
                var $link = $icon.parent();

                //prepare modal
                var $modal = jQuery('.is-modal.createlink');

                var sFunc = (plugin.settings.onFileSelectClick+'').replace( /\s/g, '');
                if(sFunc != 'function(){}' || plugin.settings.fileselect!=''){

                    $modal.find('.input-select').css('display', 'block');
                    $modal.find('.input-url').css('width','444px');

                    $modal.find('.input-select').off('click');
                    $modal.find('.input-select').on('click', function (e) {

                        if(sFunc != 'function(){}'){

                            var $modal = jQuery('.is-modal.createlink');
                            plugin.settings.onFileSelectClick({targetInput: $modal.find('.input-url').get(0), theTrigger: jQuery(this).get(0)});

                        } else {

                            var $modal = jQuery('.is-modal.fileselect');
                            if ($modal.find('iframe').attr('src') == 'about:blank') {
                                $modal.find('iframe').attr('src', plugin.settings.fileselect);
                            }
                            //show modal
                            plugin.showModal($modal);

                        }

                    });

                } else {

                    $modal.find('.input-select').css('display', 'none');
                    $modal.find('.input-url').css('width','100%');

                }

                //get values
                var url = '';
                var target = '';
                $modal.find('.input-url').val('');
                $modal.find('.input-newwindow').prop('checked', false);
                $modal.find('.input-title').val('');
                $modal.find('.input-text').val('');
                url = $link.attr('href');
                target = $link.attr('target');
                title = $link.attr('title');
                linktext = $link.html();
                $modal.find('.input-url').val(url);
                if (target == '_blank') {
                    $modal.find('.input-newwindow').prop('checked', true);
                } else {
                    $modal.find('.input-newwindow').prop('checked', false);
                }
                $modal.find('.input-title').val(title);
                $modal.find('.input-text').val(linktext);

                //show modal
                plugin.showModal($modal, true);

                $modal.find('.input-url').trigger('focus'); //must be used here, because this will clear selection => text (from getSelected()) returns empty

                $modal.off('keyup');
                $modal.on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        $modal.find('.input-ok').trigger('click');
                    }
                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var url = $modal.find('.input-url').val();
                    var title = $modal.find('.input-title').val();
                    var linktext = $modal.find('.input-text').val();

                    if (linktext == '') linktext = url;

                    if (url != '') {
                        $link.attr('href', url);

                        if ($modal.find('.input-newwindow').prop('checked')) {
                            $link.attr('target', '_blank');
                        } else {
                            $link.removeAttr('target');
                        }

                        $link.attr('title', title);
                        $link.html(linktext);
                    } else {
                        var el = $link.get(0);
                        selectElementContents(el);
                        document.execCommand('unlink', false, null);
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                    plugin.hideModal($modal);
                });

            });


            plugin.applyBehavior();

            //Trigger Render event
            //plugin.settings.onRender();

            //------------- /Executed Once --------------

        };
        //------------- /INIT --------------


        plugin.updateContentEditable = function ($block) {
            //In addition to noedit, protected & customcode block, define editable by text inside. Control elements doesn't need to be editable (ex. image can still be clicked to edit).
            if($block.find('p,h1,h2,h3,h4,h5,h6,table,ul,ol,pre,blockquote,code,figcaption,label,legend,button,a').length==0) {
                $block.attr('contenteditable', 'false');
            }
            /*
            if($block.find('nav,small,span,u,em,strong,b,strike,i,var,time,sub,sup,cite,abbr,address,dl,del,ins,details,mark,meter,q,s').length==0) {
                $block.attr('contenteditable', 'false');
            }
            */
        };

        plugin.addContent = function (html, attrname) {
            var $block = jQuery('#divCellTool').data('active');
            if(!$block) return;

            var mode = jQuery(".cell-add-options").data('mode');
            if (mode == 'cell') {

                //Limit up to 4 cells in a row
                if ($block.parent().children().not('.is-row-tool').length >= 4) {
                    alert(out('You can add max 4 column in a row'));
                    return false;
                }

                //Save for Undo
                plugin.saveForUndo();

                if(plugin.settings.cols.length==0){
                    var $tmpcell = jQuery(cellFormat);
                } else {
                    var $tmpcell = jQuery('<div>').addClass(plugin.settings.cols[plugin.settings.cols.length-1]);
                }

                if (attrname) {
                    $tmpcell.insertAfter($block).html(html).attr(attrname,'');
                } else {
                    $tmpcell.insertAfter($block).html(html);
                }

                plugin.applyBehavior();

                //fix layout
                plugin.fixLayout($block.parent());

                //change active block to the newly created
                jQuery('#divCellTool').data('active', $block.next());
                var $block = jQuery('#divCellTool').data('active');
                jQuery('#divElementTool').data('active', $block.children().first());

                $block.trigger('focus');
                plugin.saveSelection();
                $block.trigger("blur");

                if(bIsAppleMobile) {
                    var noedit = false;
                    var attr = $block.attr('data-noedit');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        noedit = true;
                    }
                    var protected = false;
                    var attr = $block.attr('data-protected');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        protected = true;
                    }
                    var customcode = false;
                    var attr = $block.attr('data-html');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        customcode = true;
                    }

                    var bIsBlockHasEditableText = false;
                    if($block.find('p,h1,h2,h3,h4,h5,h6,table,ul,ol,pre,blockquote,code,figcaption,label,legend,button,a').length>0) {
                        bIsBlockHasEditableText = true;
                    }
                    if(!plugin.settings.mobileSimpleEdit) {

                        if (customcode || noedit || protected) {

                        } else {
                            if(bIsBlockHasEditableText) {
                                $block.attr('contenteditable', 'true');
                            } else {
                                jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                            }
                        }
                    }
                }

                plugin.hideElementTools(); //If image, then it needs time to load (resulting incorrect position), so hide element tool
                plugin.renderLayoutTool();

            } else if (mode == 'row') {//mode=row

                //Save for Undo
                plugin.saveForUndo();

                var $snippet;

                if(plugin.settings.cols.length==0){
                    var $tmpcell = jQuery(cellFormat);
                } else {
                    var $tmpcell = jQuery('<div>').addClass(plugin.settings.cols[plugin.settings.cols.length-1]);
                }

                if (attrname) {
                    $tmpcell.attr(attrname, '');
                }
                var $targetcell = $tmpcell.children();
                while( $targetcell.length ) {
                    $targetcell = $targetcell.children();
                }
                $targetcell.end().html(html);

                if(plugin.settings.row==''){
                    var $tmprow = jQuery(rowFormat);
                } else {
                    var $tmprow = jQuery('<div>').addClass(plugin.settings.row);
                }

                var $targetrow = $tmprow.children();
                while( $targetrow.length ) {
                    $targetrow = $targetrow.children();
                }
                $targetrow.end().html($tmpcell[0].outerHTML);

                $snippet = $tmprow;



                $snippet.insertAfter($block.parent());

                //change active block to the newly created
                jQuery('.row-outline').removeClass('row-outline');
                jQuery('#divCellTool').data('active', $block.parent().next().children().first());
                var $block = jQuery('#divCellTool').data('active');
                jQuery('#divElementTool').data('active', $block.children().first());

                //auto scroll
                var bottompos = $snippet.offset().top + $snippet.outerHeight() - jQuery(document).scrollTop();
                var screenheight = jQuery(window).height();
                if(bottompos>screenheight){
                    var selisih = bottompos - screenheight;
                    var scrollamount = jQuery(document).scrollTop() + selisih + 100;
                    jQuery('body, html').animate({
                        scrollTop: scrollamount
                    }, 600);
                }

                plugin.applyBehavior();

                $block.trigger('focus');
                plugin.saveSelection();
                $block.trigger("blur");

                if(bIsAppleMobile) {
                    var noedit = false;
                    var attr = $block.attr('data-noedit');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        noedit = true;
                    }
                    var protected = false;
                    var attr = $block.attr('data-protected');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        protected = true;
                    }
                    var customcode = false;
                    var attr = $block.attr('data-html');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        customcode = true;
                    }

                    var bIsBlockHasEditableText = false;
                    if($block.find('p,h1,h2,h3,h4,h5,h6,table,ul,ol,pre,blockquote,code,figcaption,label,legend,button,a').length>0) {
                        bIsBlockHasEditableText = true;
                    }
                    if(!plugin.settings.mobileSimpleEdit) {

                        if (customcode || noedit || protected) {

                        } else {
                            if(bIsBlockHasEditableText) {
                                jQuery('[contenteditable]').removeAttr('contenteditable');
                                $block.parent().children().not('.is-row-tool').each(function () {
                                    jQuery(this).attr('contenteditable', 'true');
                                });
                            } else {
                                jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                            }
                        }
                    }
                }

                plugin.hideElementTools(); //If image, then it needs time to load (resulting incorrect position), so hide element tool
                plugin.renderLayoutTool();

            } else if (mode == 'elm') {//mode=elm

                //Save for Undo
                plugin.saveForUndo();

                $elm = jQuery('#divElementTool').data('active');

                //TODO: make sure it's stable in multiple levels
                var attr = $elm.parent().attr('contenteditable');
                if (typeof attr !== typeof undefined && attr !== false) {
                    //parent is cell (button should have already been hidden)
                    jQuery(html).insertAfter($elm);
                    jQuery('#divElementTool').data('active', $elm.next());
                    var div = $elm.next().get(0);
                } else {
                    //parent is another element (still inside cell)
                    jQuery(html).insertAfter($elm.parent());
                    jQuery('#divElementTool').data('active', $elm.parent().next());
                    var div = $elm.parent().next().get(0);
                }
                plugin.applyBehavior();

                //Change active element to the newly created
                $elm = jQuery('#divElementTool').data('active');
                if (!bIsAppleMobile) {
                    moveCursorToElement($elm.get(0), false);  //Move cursor to the end of newly created element
                    plugin.saveSelection();
                    plugin.getState();
                }

                plugin.hideElementTools();
                jQuery('#divElementTool').css('display', 'block');

                jQuery('.elm-active').removeClass('elm-active');
                $elm.addClass('elm-active');


                //auto scroll
                var bottompos = $elm.offset().top + $elm.outerHeight() - jQuery(document).scrollTop();
                var screenheight = jQuery(window).height();
                if(bottompos>screenheight){
                    var selisih = bottompos - screenheight;
                    var scrollamount = jQuery(document).scrollTop() + selisih + 100;
                    jQuery('body, html').animate({
                        scrollTop: scrollamount
                    }, 600);
                }

                plugin.renderElementTool();
                plugin.renderLayoutTool(); //needed to update divRowAddTool position

                //If image, then it needs time to load (resulting incorrect position), so hide element tool.
                //Don't hide all element tools here because we want #divElementTool to be visible
                if ($elm.prop("tagName").toLowerCase() == 'img') {
                    jQuery('#divElementTool').css('display', 'none');
                    jQuery('#divImageTool').css('display', 'none');
                }

            } else { //mode=lastrow

                //Save for Undo
                plugin.saveForUndo();

                if(plugin.settings.cols.length==0){
                    var $tmpcell = jQuery(cellFormat);
                } else {
                    var $tmpcell = jQuery('<div>').addClass(plugin.settings.cols[plugin.settings.cols.length-1]);
                }

                if(plugin.settings.row==''){
                    var $tmprow = jQuery(rowFormat);
                } else {
                    var $tmprow = jQuery('<div>').addClass(plugin.settings.row);
                }

                //Add after last row
                //var $builder = jQuery(plugin.settings.container).last();
                if($block) {
                    var $builder = $block.parents('.is-builder').first();
                } else {
                    var $builder = jQuery(plugin.settings.container).last();
                }
                var $snippet;
                if (attrname) {
                    $snippet = $tmprow.append($tmpcell.html(html).attr(attrname, ''));
                } else {
                    $snippet = $tmprow.append($tmpcell.html(html));
                }
                $builder.append($snippet);

                jQuery('#divCellTool').data('active', $builder.children().last().children().first()); //change active block to the newly created

                var $block = jQuery('#divCellTool').data('active');
                jQuery('#divElementTool').data('active', $block.children().first());

                //auto scroll
                var bottompos = $snippet.offset().top + $snippet.outerHeight() - jQuery(document).scrollTop();
                var screenheight = jQuery(window).height();
                if(bottompos>screenheight){
                    var selisih = bottompos - screenheight;
                    var scrollamount = jQuery(document).scrollTop() + selisih + 100;
                    jQuery('body, html').animate({
                        scrollTop: scrollamount
                    }, 600);
                }

                plugin.applyBehavior();

                $block.trigger('focus');
                plugin.saveSelection();
                $block.trigger("blur");

                if(bIsAppleMobile) {
                    var noedit = false;
                    var attr = $block.attr('data-noedit');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        noedit = true;
                    }
                    var protected = false;
                    var attr = $block.attr('data-protected');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        protected = true;
                    }
                    var customcode = false;
                    var attr = $block.attr('data-html');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        customcode = true;
                    }

                    var bIsBlockHasEditableText = false;
                    if($block.find('p,h1,h2,h3,h4,h5,h6,table,ul,ol,pre,blockquote,code,figcaption,label,legend,button,a').length>0) {
                        bIsBlockHasEditableText = true;
                    }
                    if(!plugin.settings.mobileSimpleEdit) {

                        if (customcode || noedit || protected) {

                        } else {
                            if(bIsBlockHasEditableText) {
                                jQuery('[contenteditable]').removeAttr('contenteditable');
                                $block.parent().children().not('.is-row-tool').each(function () {
                                    jQuery(this).attr('contenteditable', 'true');
                                });
                            } else {
                                jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                            }
                        }
                    }
                }

                plugin.hideElementTools(); //If image, then it needs time to load (resulting incorrect position), so hide element tool
                plugin.renderLayoutTool();

            }

            //Trigger Change event
            plugin.settings.onChange();

            //Trigger Render event
            plugin.settings.onRender();

        };

        plugin.addContentMore = function (html) { //Based on full html (with grid layout): add as is => only row mode

            //Save for Undo
            plugin.saveForUndo();

            var $newBlock = jQuery(html);
            $newBlock.find("[data-html]").each(function () {

                plugin.renderCustomCodeBlock(jQuery(this));

            });

            var mode = jQuery(".cell-add-options").data('mode');
            if (mode == 'lastrow') {

                //Add after last row
                //var $builder = jQuery(plugin.settings.container).last();
                var $block = jQuery('#divCellTool').data('active');
                if($block) {
                    var $builder = $block.parents('.is-builder').first();
                } else {
                    var $builder = jQuery(plugin.settings.container).last();
                }
                $builder.append($newBlock);//last row

                //$builder.children().last().children().first()
                jQuery('#divCellTool').data('active', $newBlock.first().children().first()); //change active block to the newly created

            } else {

                //Add after current row
                var $block = jQuery('#divCellTool').data('active');
                $newBlock.insertAfter($block.parent());

                jQuery('#divCellTool').data('active', $block.parent().next().children().first()); //change active block to the newly created

            }

            var $block = jQuery('#divCellTool').data('active');
            jQuery('#divElementTool').data('active', $block.children().first());

            //auto scroll
            var bottompos = $newBlock.last().offset().top + $newBlock.last().outerHeight() - jQuery(document).scrollTop();
            var screenheight = jQuery(window).height();
            if(bottompos>screenheight){
                var selisih = bottompos - screenheight;
                var scrollamount = jQuery(document).scrollTop() + selisih + 30;
                jQuery('body, html').animate({
                    scrollTop: scrollamount
                }, 600);
            }

            plugin.applyBehavior();

            plugin.renderLayoutTool();

            //save selection
            $block = jQuery('#divCellTool').data('active');
            $block.trigger('focus');
            //$block.trigger('click');
            plugin.saveSelection();
            $block.trigger('blur');

            //Trigger Change event
            plugin.settings.onChange();

            //Trigger Render event
            plugin.settings.onRender();

        };


        //PLUGIN RELATED METHODS

        plugin.addHtml = function (html) {

            jQuery('#divFb').prepend(html);

        };

        plugin.addCss = function (css) {

            jQuery('head').append(css);

        };

        plugin.addButton = function (pluginname, html, selector, exec) {

            var bUseMore = false;
            if(jQuery('#divRteTool').find('[data-plugin=' + pluginname + ']').length>0){ //if plugin button exists on the toolbar
                jQuery('#divRteTool').find('[data-plugin=' + pluginname + ']').first().replaceWith(html);
            } else if (jQuery('.cell-rtemore-options').find('[data-plugin=' + pluginname + ']').length>0) { //if plugin button exists on the more popup
                jQuery('.cell-rtemore-options').find('[data-plugin=' + pluginname + ']').first().replaceWith(html);
                bUseMore = true;
            } else {
                jQuery('.cell-rtemore-options').prepend(html);
                bUseMore = true;
            }

            if(jQuery('.cell-tool-option-container > div').find('.cell-rtemore').length==0 && bUseMore) {
                jQuery('.cell-tool-option-container > div').append('<button title="' + out('More') + '" class="cell-rtemore"><svg class="is-icon-flex" style="fill: rgba(0, 0, 0, 0.7);"><use xlink:href="#ion-more"></use></svg></button>');
                plugin.refreshToolbar();
                jQuery('.cell-rtemore').off('click');
                jQuery('.cell-rtemore').on('click', function (e) {

                    plugin.hideElementTools();

                    if(jQuery('.cell-rtemore-options').hasClass('arrow-top')){
                        var _width = jQuery('.cell-rtemore-options').outerWidth();
                        var _left = jQuery(this).offset().left - _width + 52;
                        var _top = jQuery(this).offset().top + 56;
                    }
                    if(jQuery('.cell-rtemore-options').hasClass('arrow-left')){
                        var _left = jQuery(this).offset().left + 63;
                        var _top = jQuery(this).offset().top ;
                    }
                    if(jQuery('.cell-rtemore-options').hasClass('arrow-right')){
                        var _width = jQuery('.cell-rtemore-options').outerWidth();
                        var _left = jQuery(this).offset().left - (_width + 10);
                        var _top = jQuery(this).offset().top;
                    }
                    jQuery('.cell-rtemore-options').css('top', _top + 'px');
                    jQuery('.cell-rtemore-options').css('left', _left + 'px');
                    jQuery(".cell-rtemore-options").css("display", "block");
                });
            }

            jQuery(selector).on('click', function () {
                exec();
            });

        };

        plugin.out= function (text) {

            return out(text);

        };

        plugin.getScope = function () {

            return $wrapper;

        };

        plugin.getSnippetPath = function () {

            return plugin.settings.snippetData.substring(0, plugin.settings.snippetData.lastIndexOf('/') + 1);

        };

        // source: http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div */
        plugin.pasteHtmlAtCaret = function (html, selectPastedContent) {
            var sel, range;

            if (window.getSelection) {

                try{
                    var curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if(jQuery(curr).parents('.is-builder').length==0) return;
                } catch(e) { return; }

                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ( (node = el.firstChild) ) {
                        lastNode = frag.appendChild(node);
                    }
                    var firstNode = frag.firstChild;
                    range.insertNode(frag);

                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        if (selectPastedContent) {
                            range.setStartBefore(firstNode);
                        } else {
                            range.collapse(true);
                        }
                        sel.removeAllRanges();
                        if(!bIsAppleMobile) sel.addRange(range);
                    }
                }
            } else if ( (sel = document.selection) && sel.type != "Control") {

                try{
                    var curr = document.selection.createRange();
                    if(jQuery(curr).parents('.is-builder').length==0) return;
                } catch(e) { return; }

                var originalRange = sel.createRange();
                originalRange.collapse(true);
                sel.createRange().pasteHTML(html);
                if (selectPastedContent) {
                    range = sel.createRange();
                    range.setEndPoint("StartToStart", originalRange);
                    if(!bIsAppleMobile) range.select();
                }
            }
        };

        plugin.getScripts = function (scripts, callback) {
            var progress = 0;
            scripts.forEach(function (script) {
                jQuery.getScript(script, function () {
                    if (++progress == scripts.length) if(callback)callback();
                });
            });
        };

        plugin.includeJs = function (filename, callback) {
            if (filesAdded.indexOf("[" + filename + "]") == -1) {

                plugin.getScripts([filename], callback);

                filesAdded += "[" + filename + "]";
            } else {
                //alert('already added');
                if(callback)callback();
            }
        };

        plugin.includeCss = function (filename) {
            if (filesAdded.indexOf("[" + filename + "]") == -1) {

                var inc = document.createElement("link");
                inc.setAttribute("rel", "stylesheet");
                inc.setAttribute("type", "text/css");
                inc.setAttribute("href", filename);
                document.getElementsByTagName("head")[0].appendChild(inc);

                filesAdded += "[" + filename + "]";
            } else {
                //alert('already added');
            }
        };

        plugin.applyStyle = function (id, s) {
            if (filesAdded.indexOf("[" + id + "]") == -1) {

                var inc = document.createElement("style");
                inc.innerHTML = s;
                document.getElementsByTagName("head")[0].appendChild(inc);

                filesAdded += "[" + id + "]";
            } else {
                //alert('already added');
            }
        };

        //LAYOUT RELATED METHODS

        plugin.fixLayout = function ($row) {
            var cellcount = $row.children().not('.is-row-tool').length;

            $row.find('.is-row-tool').insertAfter($row.children().not('.is-row-tool').last());

            var rowClass = plugin.settings.row;
            var colClass = plugin.settings.cols;
            var colEqual = plugin.settings.colequal;

            if(colEqual.length>0) {
                $row.children().not('.is-row-tool').each(function () {
                    var $cell = jQuery(this);

                    for(var i=0;i<=colClass.length-1;i++){
                        $cell.removeClass(colClass[i]);
                    }

                    for(var i=0;i<=colEqual.length-1;i++){
                        if(colEqual[i].length == cellcount){
                            $cell.addClass(colEqual[i][0]);
                            break;
                        }
                    }

                    if(cellcount==1){
                        $cell.addClass(colClass[colClass.length-1]);
                    }
                });
                return;
            }

            //others (12 columns grid)
            if(rowClass!='' && colClass.length>0){
                var n=0;
                $row.children().not('.is-row-tool').each(function () {
                    n++;
                    var $cell = jQuery(this);
                    $cell.removeClass(colClass[11]).removeClass(colClass[10]).removeClass(colClass[9]).removeClass(colClass[8]).removeClass(colClass[7]).removeClass(colClass[6]);
                    $cell.removeClass(colClass[5]).removeClass(colClass[4]).removeClass(colClass[3]).removeClass(colClass[2]).removeClass(colClass[1]).removeClass(colClass[0]);
                    if (cellcount == 1) $cell.addClass(colClass[11]);
                    if (cellcount == 2) $cell.addClass(colClass[5]);
                    if (cellcount == 3) $cell.addClass(colClass[3]);
                    if (cellcount == 4) $cell.addClass(colClass[2]);
                    if (cellcount == 5) {
                        if(n==5)  $cell.addClass(colClass[3]);
                        else $cell.addClass(colClass[1]);
                    }
                    if (cellcount == 6) $cell.addClass(colClass[1]);
                });
            } else {
                var framework = plugin.settings.framework;

                //uikit
                if(framework=='uikit') {
                    $row.children().not('.is-row-tool').each(function () {
                        var $cell = jQuery(this);
                        $cell.removeClass('uk-width-1-1').removeClass('uk-width-1-2').removeClass('uk-width-1-3').removeClass('uk-width-1-4');
                        if (cellcount == 1) $cell.addClass('uk-width-1-1');
                        if (cellcount == 2) $cell.addClass('uk-width-1-2');
                        if (cellcount == 3) $cell.addClass('uk-width-1-3');
                        if (cellcount == 4) $cell.addClass('uk-width-1-4');
                    });
                }

                //flex
                if (framework == 'flex') {
                    var percent = 100 / cellcount;
                    $row.children().not('.is-row-tool').each(function () {
                        var $cell = jQuery(this);
                        $cell.css('width', percent + '%');
                    });
                }

            }

        };

        plugin.moveRowToNextContainer = function ($row) {
            var $currContainer = $row.parents('.is-builder').last();
            if ($currContainer.parents('.is-builder').length > 0) return; //disable sub container moving

            var flag = false;
            jQuery('.is-builder').each(function () {
                if (flag) {
                    $row.insertBefore(jQuery(this).children().first());

                    //Trigger Change event
                    plugin.settings.onChange();

                    return false;
                }
                if (jQuery(this).html() == $currContainer.html()) {
                    flag = true;
                }
            });
        };

        plugin.moveRowToPrevContainer = function ($row) {

            var $currContainer = $row.parents('.is-builder').last();
            if ($currContainer.parents('.is-builder').length > 0) return; //disable sub container moving

            var $prev = null;
            jQuery('.is-builder').each(function () {
                if (jQuery(this).html() == $currContainer.html()) {
                    if ($prev) {
                        $row.insertAfter($prev.children().last());

                        //Trigger Change event
                        plugin.settings.onChange();

                        return false;
                    }
                }
                $prev = jQuery(this);
            });
        };

        plugin.moveCellToNextContainer = function ($block) {

            var $currContainer = $block.parents('.is-builder').last();
            if ($currContainer.parents('.is-builder').length > 0) return; //disable sub container moving

            var flag = false;
            jQuery('.is-builder').each(function () {
                if (flag) {
                    var $blockRow = $block.parent();

                    var precise = false;
                    //---- More precise ----


                    //---- /More precise ----

                    if (!precise) {
                        $block.insertBefore(jQuery(this).children().first()).wrap('<div class="row"></div>');
                        if ($blockRow.children().length == 0) $blockRow.remove();
                    }

                    //Trigger Change event
                    plugin.settings.onChange();

                    return false;
                }
                if (jQuery(this).html() == $currContainer.html()) {
                    flag = true;
                }
            });
        };

        plugin.moveCellToPrevContainer = function ($block) {

            var $currContainer = $block.parents('.is-builder').last();
            if ($currContainer.parents('.is-builder').length > 0) return; //disable sub container moving

            var $prev = null;
            jQuery('.is-builder').each(function () {
                if (jQuery(this).html() == $currContainer.html()) {
                    if ($prev) {
                        var $blockRow = $block.parent();

                        var precise = false;
                        //---- More precise ----
                        /*
                        var $prevRow = null;
                        $prev.children().each(function () {
                        $row = jQuery(this);

                        //find row where the current block exists
                        $row.find('div').each(function () {
                        if (jQuery(this).html() == $block.html()) {
                        if ($prevRow) {
                        $block.insertAfter($prevRow).wrap('<div class="row"></div>');
                        if ($blockRow.children().length == 0) $blockRow.remove();
                        precise = true;

                        return false;
                        }
                        }

                        });
                        $prevRow = jQuery(this)
                        });
                        */
                        //---- /More precise ----

                        if (!precise) {
                            $block.insertAfter($prev.children().last()).wrap('<div class="row"></div>');
                            if ($blockRow.children().length == 0) $blockRow.remove();
                        }

                        //Trigger Change event
                        plugin.settings.onChange();

                        return false;
                    }
                }
                $prev = jQuery(this);
            });
        };

        //BEHAVIOR RELATED METHODS

        plugin.applyBehavior = function () {

            jQuery(plugin.settings.container).addClass('is-builder');

            /*if (localStorage.getItem("_hiderowtool") != null) {
                if(localStorage.getItem("_hiderowtool")=='1'){
                    plugin.settings.rowTool = false;
                } else {
                    plugin.settings.rowTool = true;
                }
            }*/

            if (localStorage.getItem("_buildermode") != null) {
                plugin.settings.builderMode = localStorage.getItem("_buildermode");
            }
            if(plugin.settings.builderMode==''){
                jQuery('.is-builder').removeAttr('minimal');
                jQuery('.is-builder').removeAttr('clean');
            } else if(plugin.settings.builderMode=='minimal'){
                jQuery('.is-builder').attr('minimal','');
                jQuery('.is-builder').removeAttr('clean');
            } else if(plugin.settings.builderMode=='clean'){
                jQuery('.is-builder').attr('clean','');
                jQuery('.is-builder').removeAttr('minimal');
            }

            if (localStorage.getItem("_rowtool") != null) {
                plugin.settings.rowTool = localStorage.getItem("_rowtool");
            }
            if(plugin.settings.rowTool=='right'){
                jQuery('.is-builder').removeAttr('leftrowtool');
            } else {
                jQuery('.is-builder').attr('leftrowtool', '');
            }

            if (localStorage.getItem("_addbuttonplace") != null) {
                plugin.settings.addButtonPlacement = localStorage.getItem("_addbuttonplace");
            }
            if(plugin.settings.addButtonPlacement==''){
                jQuery('.is-builder').removeAttr('between-blocks-left');
                jQuery('.is-builder').removeAttr('between-blocks-center');
            } else if(plugin.settings.addButtonPlacement=='between-blocks-left'){
                jQuery('.is-builder').attr('between-blocks-left', '');
                jQuery('.is-builder').removeAttr('between-blocks-center');
            } else if(plugin.settings.addButtonPlacement=='between-blocks-center'){
                jQuery('.is-builder').attr('between-blocks-center', '');
                jQuery('.is-builder').removeAttr('between-blocks-left');
            }

            if (localStorage.getItem("_hidecelltool") != null) {
                if(localStorage.getItem("_hidecelltool")=='1'){
                    plugin.settings.columnTool = false;
                } else {
                    plugin.settings.columnTool = true;
                }
            }

            if (localStorage.getItem("_hiderowcoloutline") != null) {
                if(localStorage.getItem("_hiderowcoloutline")=='1'){
                    plugin.settings.rowcolOutline = false;
                    jQuery('.is-builder').attr('hideoutline','');
                } else {
                    plugin.settings.rowcolOutline = true;
                    jQuery('.is-builder').removeAttr('hideoutline');
                }
                var $modal = jQuery('.is-modal.grideditor');
                if($modal.hasClass('active')) {
                    jQuery('.is-builder').removeAttr('hideoutline');
                }
            } else {
                if(plugin.settings.rowcolOutline){
                    jQuery('.is-builder').removeAttr('hideoutline');
                } else {
                    jQuery('.is-builder').attr('hideoutline','');
                }
            }

            if (localStorage.getItem("_dragwithouthandle") != null) {
                if(localStorage.getItem("_dragwithouthandle")=='1'){
                    plugin.settings.dragWithoutHandle = true;
                    jQuery('.is-builder').attr('dragwithouthandle','');
                } else {
                    plugin.settings.dragWithoutHandle = false;
                    jQuery('.is-builder').removeAttr('dragwithouthandle');
                }
            } else {
                if(plugin.settings.dragWithoutHandle){
                    jQuery('.is-builder').attr('dragwithouthandle','');
                } else {
                    jQuery('.is-builder').removeAttr('dragwithouthandle');
                }
            }
            if (localStorage.getItem("_animatedsorting") != null) {
                if(localStorage.getItem("_animatedsorting")=='1'){
                    plugin.settings.animatedSorting = true;
                } else {
                    plugin.settings.animatedSorting = false;
                }
            }
            if (localStorage.getItem("_hidecolhtmleditor") != null) {
                if(localStorage.getItem("_hidecolhtmleditor")=='1'){
                    plugin.settings.columnHtmlEditor = false;
                } else {
                    plugin.settings.columnHtmlEditor = true;
                }
            }
            if (localStorage.getItem("_hiderowhtmleditor") != null) {
                if(localStorage.getItem("_hiderowhtmleditor")=='1'){
                    plugin.settings.rowHtmlEditor = false;
                } else {
                    plugin.settings.rowHtmlEditor = true;
                }
            }
            if (localStorage.getItem("_hiderowmovebuttons") != null) {
                if(localStorage.getItem("_hiderowmovebuttons")=='1'){
                    plugin.settings.rowMoveButtons = false;
                } else {
                    plugin.settings.rowMoveButtons = true;
                }
            }
            if (localStorage.getItem("_advancedhtmleditor") != null) {
                if(localStorage.getItem("_advancedhtmleditor")=='1'){
                    this.settings.htmlSyntaxHighlighting = true;
                } else {
                    this.settings.htmlSyntaxHighlighting = false;
                }
            }
            if (localStorage.getItem("_scrollableeditor") != null) {
                if(localStorage.getItem("_scrollableeditor")=='1'){
                    this.settings.scrollableEditingToolbar = true;
                } else {
                    this.settings.scrollableEditingToolbar = false;
                }
            }
            if (localStorage.getItem("_editingtoolbar") != null) {
                this.settings.toolbar = localStorage.getItem("_editingtoolbar");
            }
            if (localStorage.getItem("_editingtoolbardisplay") != null) {
                this.settings.toolbarDisplay = localStorage.getItem("_editingtoolbardisplay");
            }
            if (localStorage.getItem("_pasteresult") != null) {
                this.settings.paste = localStorage.getItem("_pasteresult");
            }
            if (localStorage.getItem("_outlinemode") != null) {
                this.settings.outlineMode = localStorage.getItem("_outlinemode");
            }
            if (localStorage.getItem("_hideelementhighlight") != null) {
                if(localStorage.getItem("_hideelementhighlight")=='1'){
                    plugin.settings.elementHighlight = false;
                    jQuery('.is-builder').attr('hideelementhighlight','');
                } else {
                    plugin.settings.elementHighlight = true;
                    jQuery('.is-builder').removeAttr('hideelementhighlight');
                }
            } else {
                if(plugin.settings.elementHighlight){
                    jQuery('.is-builder').removeAttr('hideelementhighlight');
                } else {
                    jQuery('.is-builder').attr('hideelementhighlight','');
                }
            }

            //Make absolute
            if(this.settings.absolutePath) {
                jQuery(plugin.settings.container).find('a').each(function () {
                    var href = jQuery(this).get(0).href;
                    jQuery(this).attr('href',href);
                });
                jQuery(plugin.settings.container).find('img').each(function () {
                    var href = jQuery(this).get(0).src;
                    jQuery(this).attr('src',href);
                });
            }

            var drag_handler = '';
            if (typeof jQuery.ui !== 'undefined') {
                drag_handler = '<div title="Move" class="row-handle" style="display:block;width:100%;cursor:move;background-color:#fff;text-align:center;"><svg class="is-icon-flex" style="width: 13px;height: 13px;fill: rgba(0,0,0,0.7);margin-top:-5px"><use xlink:href="#ion-move"></use></svg></div>';
            }

            jQuery('.is-builder').each(function () {

                //New Row Tool
                jQuery(this).children('div').each(function(){

                    var _top = parseInt(jQuery(this).css('padding-top'));
                    if(!plugin.settings.columnTool) {
                        var _top = 0;
                    }
                    if(jQuery(this).html()!=''){
                        if(jQuery(this).find('.is-row-tool').length==0){

                            jQuery(this).append('<div class="is-row-tool is-tool" style="top:'+_top+'px">' +
                                drag_handler +
                                '<button title="' + out('Add') + '" class="row-add"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-plus-empty"></use></svg></button>' +
                                '<button title="' + out('Grid Tool') + '" class="row-grideditor"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.6);width:13px;height:13px;"><use xlink:href="#ion-grid"></use></svg></button>' +
                                '<button title="' + out('Move Up') + '" class="row-up" style="display: block;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-up"></use></svg></button>' +
                                '<button title="' + out('Move Down') + '" class="row-down" style="display: block;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:15px;height:15px;"><use xlink:href="#ion-ios-arrow-thin-down"></use></svg></button>' +
                                '<button title="' + out('Duplicate') + '" class="row-duplicate" style="display: block;"><svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-ios-photos-outline"></use></svg></button>' +
                                '<button title="' + out('HTML') + '" class="row-html"><svg class="is-icon-flex" style="margin-right:-3px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-left"></use></svg><svg class="is-icon-flex" style="margin-left:-2px;fill:rgba(0, 0, 0, 0.65);width:14px;height:14px;"><use xlink:href="#ion-ios-arrow-right"></use></svg></button>' +
                                '<button title="' + out('Delete') + '" class="row-remove"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:23px;height:23px;"><use xlink:href="#ion-ios-close-empty"></use></svg></button></div>' +
                            '</div>');
                            //if (!plugin.settings.rowHtmlEditor) jQuery('.row-html').addClass('display-none');
                        }
                    }

                    //ROW

                    jQuery(this).find('.is-row-tool .row-grideditor').off('click');
                    jQuery(this).find('.is-row-tool .row-grideditor').on('click', function (e) {

                        var $modal = jQuery('.is-modal.grideditor');
                        if($modal.hasClass('active')) {
                            $modal.removeClass('active');

                            if (localStorage.getItem("_hiderowcoloutline") != null) {
                                if(localStorage.getItem("_hiderowcoloutline")=='1'){
                                    jQuery('.is-builder').attr('hideoutline','');
                                } else {
                                    jQuery('.is-builder').removeAttr('hideoutline');
                                }
                            } else {
                                if(plugin.settings.rowcolOutline){
                                    jQuery('.is-builder').removeAttr('hideoutline');
                                } else {
                                    jQuery('.is-builder').attr('hideoutline','');
                                }
                            }

                            return;
                        }

                        jQuery('.is-builder').removeAttr('hideoutline');

                        $modal.addClass('active');

                        if(plugin.settings.builderMode=='clean') {
                            var $block = jQuery('#divCellTool').data('active');
                            $block.parent().find('.is-row-tool').last().css("display", "none");
                        }

                        $modal.find('.is-modal-close').off("click");
                        $modal.find(".is-modal-close").on('click', function () {
                            $modal.removeClass('active');

                            if (localStorage.getItem("_hiderowcoloutline") != null) {
                                if(localStorage.getItem("_hiderowcoloutline")=='1'){
                                    jQuery('.is-builder').attr('hideoutline','');
                                } else {
                                    jQuery('.is-builder').removeAttr('hideoutline');
                                }
                            } else {
                                if(plugin.settings.rowcolOutline){
                                    jQuery('.is-builder').removeAttr('hideoutline');
                                } else {
                                    jQuery('.is-builder').attr('hideoutline','');
                                }
                            }

                            if (localStorage.getItem("_hideelementtool") != null) {
                                if(localStorage.getItem("_hideelementtool")=='1'){
                                    plugin.settings.elementTool = false;
                                    jQuery('#divElementTool').css('display','none');
                                } else {
                                    plugin.settings.elementTool = true;
                                }
                            }

                            jQuery('.is-builder').removeAttr('gridoutline');

                            if(plugin.settings.builderMode=='clean') {
                                var $block = jQuery('#divCellTool').data('active');
                                $block.parent().find('.is-row-tool').last().css("display", "block");
                            }
                        });

                        e.preventDefault();
                        e.stopImmediatePropagation(); //a must. In case current row is within is-builder inside parent block (to prevent parent row click)

                    });

                    jQuery(this).find('.is-row-tool .row-up').off('click');
                    jQuery(this).find('.is-row-tool .row-up').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var $block = jQuery('#divCellTool').data('active');

                        if ($block.parent().prev().length > 0) {
                            $block.parent().insertBefore($block.parent().prev());
                        } else {
                            plugin.moveRowToPrevContainer($block.parent());
                        }

                        plugin.renderLayoutTool(true);
                        plugin.checkEmpty();

                        //Trigger Change event
                        plugin.settings.onChange();

                        e.preventDefault();
                        e.stopImmediatePropagation(); //a must. In case current row is within is-builder inside parent block (to prevent parent row click)
                    });

                    jQuery(this).find('.is-row-tool .row-down').off('click');
                    jQuery(this).find('.is-row-tool .row-down').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        var $block = jQuery('#divCellTool').data('active');

                        if ($block.parent().next().length > 0) {
                            $block.parent().insertAfter($block.parent().next());
                        } else {
                            plugin.moveRowToNextContainer($block.parent());
                        }

                        plugin.renderLayoutTool(true);
                        plugin.checkEmpty();

                        //Trigger Change event
                        plugin.settings.onChange();

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });

                    jQuery(this).find('.is-row-tool .row-remove').off('click');
                    jQuery(this).find('.is-row-tool .row-remove').on('click', function (e) {

                        var $block = jQuery('#divCellTool').data('active');

                        //Change to row selection
                        plugin.renderLayoutTool(true);

                        //show modal
                        var $modal = jQuery('.is-modal.delconfirm');
                        plugin.showModal($modal, false, true, null);

                        $modal.find('.input-ok').off('click');
                        $modal.find('.input-ok').on('click', function (e) {

                            //Save for Undo
                            plugin.saveForUndo();

                            $block.parent().remove();

                            plugin.checkEmpty();

                            //Trigger Change event
                            plugin.settings.onChange();

                            plugin.hideModal($modal);
                        });

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });

                    jQuery(this).find('.is-row-tool .row-duplicate').off('click');
                    jQuery(this).find('.is-row-tool .row-duplicate').on('click', function (e) {

                        //Save for Undo
                        plugin.saveForUndo();

                        plugin.hideElementTools();

                        var $block = jQuery('#divCellTool').data('active');

                        $block.parent().clone().insertBefore($block.parent()).children().removeClass('cell-active');

                        plugin.applyBehavior();

                        //change to row selection
                        jQuery('.cell-active').removeClass('cell-active');
                        jQuery('.row-active').removeClass('row-active');
                        $block.parent().addClass('row-active');
                        jQuery('.row-outline').removeClass('row-outline');
                        if($block.parent().children('div').not('.is-row-tool').length > 1) {
                            $block.parent().addClass('row-outline');
                        }

                        plugin.renderLayoutTool();

                        //Trigger Change event
                        plugin.settings.onChange();

                        //Trigger Render event
                        plugin.settings.onRender();

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });

                    jQuery(this).find('.is-row-tool .row-add').off('click');
                    jQuery(this).find('.is-row-tool .row-add').on('click', function (e) {

                        jQuery(".cell-add-options").data('mode', 'row');

                        //change to row selection
                        plugin.hideElementTools();
                        jQuery("#divCellTool").css("display", "none");
                        jQuery('#divRowAddTool').css('display', 'none');
                        jQuery('.cell-active').removeClass('cell-active');
                        jQuery('.row-active').removeClass('row-active');
                        var $block = jQuery('#divCellTool').data('active');
                        $block.parent().addClass('row-active');

                        var _width = jQuery(".cell-add-options").outerWidth();
                        var _top = jQuery(this).offset().top;
                        if(plugin.settings.rowTool == 'right') {
                            var _left = jQuery(this).offset().left - _width - 8;
                            jQuery(".cell-add-options").css("top", _top + "px");
                            jQuery(".cell-add-options").css("left", _left + "px");
                            jQuery(".cell-add-options").css("display", "block");
                            jQuery(".cell-add-options").removeClass("arrow-top");
                            jQuery(".cell-add-options").removeClass("arrow-left");
                            jQuery(".cell-add-options").removeClass("arrow-bottom");
                            jQuery(".cell-add-options").removeClass("center");
                            jQuery(".cell-add-options").addClass("arrow-right");

                        } else {
                            var _left = jQuery(this).offset().left + (56);
                            jQuery(".cell-add-options").css("top", _top + "px");
                            jQuery(".cell-add-options").css("left", _left + "px");
                            jQuery(".cell-add-options").css("display", "block");
                            jQuery(".cell-add-options").removeClass("arrow-top");
                            jQuery(".cell-add-options").removeClass("arrow-right");
                            jQuery(".cell-add-options").removeClass("arrow-bottom");
                            jQuery(".cell-add-options").removeClass("center");
                            jQuery(".cell-add-options").addClass("arrow-left");
                        }

                        var _screenwidth = jQuery(window).width();
                        if(_screenwidth <= 640) {
                            jQuery(".cell-add-options").css("display", "flex");
                        } else {
                            jQuery(".cell-add-options").css("display",  "block");
                        }
                        jQuery('.cell-add-options .is-pop-close').off('click');
                        jQuery('.cell-add-options .is-pop-close').on('click', function (e) {
                            jQuery(".cell-add-options").css("display", "none");
                        });

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });

                    jQuery(this).find('.is-row-tool .row-html').off('click');
                    jQuery(this).find('.is-row-tool .row-html').on('click', function (e) {

                        plugin.viewRowHtml();

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });

                });



                jQuery(this).children().children().not('.is-row-tool').each(function () {

                    if(jQuery(this).parent().hasClass('row-add-initial'))return;

                    /*
                    For backward compatibility, replace:
                    data-mode="readonly" with data-noedit
                    data-mode="readonly-protected" with data-protected
                    */
                    if(jQuery(this).attr('data-mode')=='readonly'){
                        jQuery(this).attr('data-noedit','');
                        jQuery(this).removeAttr('data-mode');
                    }
                    if(jQuery(this).attr('data-mode')=='readonly-protected'){
                        jQuery(this).attr('data-protected','');
                        jQuery(this).removeAttr('data-mode');
                    }

                    //Set contenteditable on cell (on Desktop)
                    var noedit = false;
                    var attr = jQuery(this).attr('data-noedit');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        noedit = true;
                    }
                    var protected = false;
                    var attr = jQuery(this).attr('data-protected');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        protected = true;
                    }
                    var customcode = false; //or plugin
                    var attr = jQuery(this).attr('data-html');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        customcode = true;
                    }

                    if (customcode || noedit || protected) {
                        //
                    } else {
                        if (bIsAppleMobile) {
                            //On Apple Mobile, decide contenteditable later (See ON CLICK below)
                        } else {
                            jQuery(this).attr('contenteditable', 'true');
                        }
                    }

                    //Set contenteditable FALSE on special elements
                    jQuery(this).find('.is-social,.spacer, hr').attr('contenteditable', 'false');
                    jQuery(this).find('a').each(function(){
                        if (jQuery(this).css('display') == 'inline-block') {
                            //link button
                            //jQuery(this).attr('contenteditable',false);
                            if(jQuery(this).parent().children('a').length ==1 && jQuery(this).parent().prop("tagName").toLowerCase() !='span'){
                                jQuery(this).wrap('<span contenteditable="false"></span>');
                            } else {
                                jQuery(this).parent().attr('contenteditable', false);
                            }
                            jQuery(this).attr('contenteditable', true);
                        }
                    });

                    plugin.updateContentEditable(jQuery(this));

                    //iframe overlay (need to be added so that embeded video, map, etc can be selected). First click will disable/hide the overlay. Outside click will re-enable it.
                    jQuery(this).find(".embed-responsive").each(function () {
                        if (jQuery(this).find('.ovl').length == 0) {
                            jQuery(this).append('<div class="ovl" style="position:absolute;background:#fff;opacity:0.01;cursor:pointer;top:0;left:0px;width:100%;height:100%;z-index:1"></div>');

                            jQuery(this).find('.ovl').on('click', function () {
                                jQuery(this).css('display', 'none');
                            });
                        }
                    });

                    if(jQuery(this).parent().hasClass('row-outline') && jQuery(this).parent().children('div').not('.is-row-tool').length == 1) {
                        jQuery(this).parent().removeClass('row-outline');
                    }

                    //FIX HEIGHT (for smooth dragging/sortable)
                    jQuery(this).off('mouseover touchstart');
                    jQuery(this).on('mouseover touchstart', function (e) {
                        jQuery(this).parent().data('height', jQuery(this).parent().height());
                    });

                    jQuery(this).off('paste');
                    jQuery(this).on('paste', function (e) {
                        plugin.pasteContent();
                    });

                    //ON CLICK
                    jQuery(this).off('click');
                    jQuery(this).on('click', function (e) {

                        if(jQuery(this).hasClass('is-row-tool')) return;
                        if(jQuery(this).parents('.is-row-tool').length>0) return;

                        if (localStorage.getItem("_hiderowcoloutline") != null) {
                            if(localStorage.getItem("_hiderowcoloutline")=='1'){
                                plugin.settings.rowcolOutline = false;
                                jQuery('.is-builder').attr('hideoutline','');
                            } else {
                                plugin.settings.rowcolOutline = true;
                                jQuery('.is-builder').removeAttr('hideoutline');
                            }
                        }
                        var $modal = jQuery('.is-modal.grideditor');
                        if($modal.hasClass('active')) {
                            jQuery('.is-builder').removeAttr('hideoutline');
                        }

                        if (localStorage.getItem("_buildermode") != null) {
                             plugin.settings.builderMode = localStorage.getItem("_buildermode");
                        }
                        if(plugin.settings.builderMode==''){
                            jQuery('.is-builder').removeAttr('minimal');
                            jQuery('.is-builder').removeAttr('clean');
                        } else if(plugin.settings.builderMode=='minimal'){
                            jQuery('.is-builder').attr('minimal','');
                            jQuery('.is-builder').removeAttr('clean');
                        } else if(plugin.settings.builderMode=='clean'){
                            jQuery('.is-builder').attr('clean','');
                            jQuery('.is-builder').removeAttr('minimal');
                        }

                        if (localStorage.getItem("_addbuttonplace") != null) {
                            plugin.settings.addButtonPlacement = localStorage.getItem("_addbuttonplace");
                        }
                        if(plugin.settings.addButtonPlacement==''){
                            jQuery('.is-builder').removeAttr('between-blocks-left');
                            jQuery('.is-builder').removeAttr('between-blocks-center');
                        } else if(plugin.settings.addButtonPlacement=='between-blocks-left'){
                            jQuery('.is-builder').attr('between-blocks-left', '');
                            jQuery('.is-builder').removeAttr('between-blocks-center');
                        } else if(plugin.settings.addButtonPlacement=='between-blocks-center'){
                            jQuery('.is-builder').attr('between-blocks-center', '');
                            jQuery('.is-builder').removeAttr('between-blocks-left');
                        }

                        var bNoElmTool = false;
                        if(jQuery('.grideditor').hasClass('active')) {
                            if(!plugin.settings.elementTool) {
                                bNoElmTool=true;
                            }
                        }  else {
                            if (localStorage.getItem("_hideelementtool") != null) {
                                if(localStorage.getItem("_hideelementtool")=='1'){
                                    bNoElmTool=true;
                                }
                            } else {
                                if(!plugin.settings.elementTool) {
                                    bNoElmTool=true;
                                }
                            }
                        }

                        var noedit = false;
                        var attr = jQuery(this).attr('data-noedit');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            noedit = true;
                        }
                        var protected = false;
                        var attr = jQuery(this).attr('data-protected');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            protected = true;
                        }
                        var customcode = false;
                        var attr = jQuery(this).attr('data-html');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            customcode = true;
                        }
                        var custommodule = false;
                        var attr = jQuery(this).attr('data-module');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            custommodule = true;
                        }

                        //Show/hide RTE tool (#divRteTool)
                        if (bIsAppleMobile) {

                            jQuery('#divRteTool').css('display', 'none');

                            //On Apple Mobile: Set contenteditable on cell

                            var bIsBlockHasEditableText = false;
                            if(jQuery(this).find('p,h1,h2,h3,h4,h5,h6,table,ul,ol,pre,blockquote,code,figcaption,label,legend,button,a').length>0) {
                                bIsBlockHasEditableText = true;
                            }

                            if(plugin.settings.mobileSimpleEdit) {

                                if (customcode || noedit || protected) {

                                } else {

                                    if (jQuery(this).hasClass('cell-active') && bIsBlockHasEditableText) {

                                        if (jQuery('body').hasClass('full-edit')) {

                                            //Continue editing

                                            //save selection
                                            plugin.saveSelection();
                                            // setTimeout(function () {
                                            //     plugin.saveSelection();
                                            // },1000);
                                            jQuery('.textblock-active').removeClass('textblock-active');

                                        } else {

                                            if (jQuery(e.target).parents('.elm-active').length > 0 || jQuery(e.target).hasClass('elm-active')) {

                                                jQuery(this).trigger('blur'); //prevent keyboard popup if not in full-edit mode
                                                jQuery('body').addClass('full-edit');
                                                jQuery(this).addClass('mobile-edit');

                                                /* RTE tool */
                                                plugin.settings.toolbar = 'top';
                                                plugin.refreshToolbar();
                                                jQuery('#divRteTool').css('display', 'block');
                                                /* /RTE tool */

                                                jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                                                jQuery(this).attr('contenteditable', 'true');

                                                jQuery('.mobile-close').off('click');
                                                jQuery('.mobile-close').on('click', function () {

                                                    jQuery('body').removeClass('full-edit');
                                                    jQuery('.mobile-edit').removeClass('mobile-edit');
                                                    jQuery('[contenteditable]').not(this).removeAttr('contenteditable');

                                                });

                                                /*
                                                jQuery('.mobile-preview').off('click');
                                                jQuery('.mobile-preview').on('click', function () {

                                                    jQuery('.mobile-edit').trigger('blur');

                                                });*/

                                            } else {


                                                jQuery(this).trigger('blur'); //prevent keyboard popup if not in full-edit mode


                                                //Continue select element
                                            }

                                        }

                                    } else {

                                        //Continue select cell
                                        jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                                        //jQuery(this).attr('contenteditable', 'true');

                                    }
                                }

                            } else {

                                //Improved editing on iPad (New Version)
                                if (customcode || noedit || protected) {
                                    //Continue select cell
                                    jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                                } else {

                                    if(bIsBlockHasEditableText) {

                                        if (!jQuery(this).hasClass('cell-active') && jQuery(this).parent().find('.cell-active').length==0 ||
                                            ((jQuery(this).hasClass('cell-active') && jQuery(this).parent().find('.cell-active').length>0) && jQuery(this).attr('contenteditable')!='true') // for newly added snippets. check if block is selected/active, but it is not editable.
                                        ) {

                                            jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                                            jQuery(this).attr('contenteditable', 'true');
                                            jQuery(this).parent().children().not('.is-row-tool').each(function () {
                                                jQuery(this).attr('contenteditable', 'true');
                                            });

                                        } else {

                                            //save selection
                                            plugin.saveSelection();
                                            // setTimeout(function () {
                                            //     plugin.saveSelection();
                                            // },1000);
                                            jQuery('.textblock-active').removeClass('textblock-active');

                                            plugin.refreshToolbar();
                                            jQuery('#divRteTool').css('display', 'block');

                                        }

                                    } else {
                                        //Continue select cell
                                        jQuery('[contenteditable]').not(this).removeAttr('contenteditable');
                                    }

                                }

                            }

                        } else {

                            var attr = jQuery(this).attr('contenteditable');
                            if (attr == 'true') {

                                //save selection
                                plugin.saveSelection();

                                /* RTE tool */
                                //plugin.refreshToolbar();
                                plugin.positionToolbar();

                                jQuery('#divRteTool').css('display', 'block');
                                /* /RTE tool */

                            } else {
                                jQuery('#divRteTool').css('display', 'none');
                            }

                        }

                        //Set Active Cell/Block
                        jQuery('#divCellTool').data('active', jQuery(this));

                        jQuery('.cell-active').removeClass('cell-active');
                        jQuery(this).addClass('cell-active');

                        jQuery('.row-outline').removeClass('row-outline');

                        if(jQuery(this).parent().children('div').not('.is-row-tool').length > 1) {
                            jQuery(this).parent().addClass('row-outline');
                        }

                        if(plugin.settings.outlineMode == 'row') {
                            jQuery(this).parent().addClass('row-active');
                        }

                        //Set Active Element
                        jQuery('.elm-active').removeClass('elm-active');
                        jQuery("#divElementTool").css("display", "none");

                        if (customcode || noedit || protected) {

                            jQuery("#divElementTool").css("display", "none");

                            jQuery("#divElementTool").data('active', jQuery('#divCellTool').data('active')); //set active element: active Cell/Block

                            jQuery("#divElementTool").data('active-inspected', jQuery('#divCellTool').data('active')); //set active element inspected: active Cell/Block

                        } else {

                            var tagname = jQuery(e.target).prop("tagName").toLowerCase();

                            jQuery("#divElementTool").data('active-inspected', jQuery(e.target)); //set active element inspected

                            if (tagname == 'h1' || tagname == 'h2' || tagname == 'h3' || tagname == 'h4' || tagname == 'h5' || tagname == 'h6' || tagname == 'p' || tagname == 'pre' || tagname == 'blockquote' || tagname == 'li' || tagname == 'img' || tagname == 'iframe') {

                                jQuery(e.target).addClass('elm-active');

                                if(!bNoElmTool) jQuery("#divElementTool").css("display", "block");

                                jQuery("#divElementTool").data('active', jQuery(e.target)); //set active element

                            } else {

                                /*
                                <div class="cell-active">
                                ..level 0
                                <p>
                                ..level 1
                                <b>..level 2</b>
                                </p>

                                <div class="display">
                                ..level 1
                                <h1>..level 2..</h1>
                                <p>..level 2..</p>
                                </div>
                                </div>

                                Note: p, h1, h2,...goes to previous if
                                */

                                if (jQuery(e.target).hasClass('cell-active')) {

                                    //level 0
                                    jQuery("#divElementTool").css("display", "none");

                                    jQuery("#divElementTool").data('active', jQuery(e.target)); //dummy

                                } else if (jQuery(e.target).parent().hasClass('cell-active')) {

                                    //level 1
                                    jQuery(e.target).addClass('elm-active');

                                    if(!bNoElmTool) jQuery("#divElementTool").css("display", "block");

                                    jQuery("#divElementTool").data('active', jQuery(e.target)); //set active element to level 1

                                } else {

                                    //Deeper levels
                                    jQuery(e.target).parents().each(function () {

                                        var tagname = jQuery(this).prop("tagName").toLowerCase();

                                        if (tagname == 'h1' || tagname == 'h2' || tagname == 'h3' || tagname == 'h4' || tagname == 'h5' || tagname == 'h6' || tagname == 'p' || tagname == 'pre' || tagname == 'blockquote' || tagname == 'li' || tagname == 'img' || tagname == 'iframe') {

                                            jQuery(this).addClass('elm-active');

                                            if(!bNoElmTool) jQuery("#divElementTool").css("display", "block");

                                            jQuery("#divElementTool").data('active', jQuery(this)); //set active element

                                            return false;

                                        } else if (jQuery(this).parent().hasClass('cell-active')) {

                                            jQuery(this).addClass('elm-active');

                                            if(!bNoElmTool) jQuery("#divElementTool").css("display", "block");

                                            jQuery("#divElementTool").data('active', jQuery(this)); //Always set active element to level 1

                                            return false;

                                        }

                                    });
                                }
                            }
                        }

                        //Element Editing Mode
                        if( jQuery('.elementstyles').hasClass('active')) { //Element panel is open

                            jQuery('.element-edit').trigger('click');
                            return false; //stop here (continue with inspect element)
                        }

                        //Normal Editing Mode
                        var $block = jQuery('#divCellTool').data('active');

                        if(parseInt(jQuery('body').css('margin-right'))!=0 || parseInt(jQuery('body').css('margin-left'))!=0){ //if(jQuery('body').hasClass('body-fullview')){
                            setTimeout(function () {
                                //Wait 300ms until body sliding finished
                                plugin.renderLayoutTool();
                            },301);
                        } else {
                            plugin.renderLayoutTool();
                        }

                        if(bSideSnippets){
                            var _screenwidth = jQuery(window).width();
                            if(bIsAppleMobile && _screenwidth <= 1024) {
                                if ( (plugin.settings.sidePanel == 'right' && plugin.settings.rowTool == 'right') ||
                                    (plugin.settings.sidePanel == 'left' && plugin.settings.rowTool == 'left')) {

                                    jQuery('.is-row-tool').each(function(){
                                        if(jQuery(this).css('display')=='block'){
                                            var _topFromWindow = jQuery(this).offset().top - $(window).scrollTop();
                                            if(_topFromWindow<=220) {
                                                jQuery('#divSnippetHandle').css('top','360px');
                                            } else {
                                                jQuery('#divSnippetHandle').css('top','170px');
                                            }
                                        }
                                    });

                                }
                            }
                        }

                        plugin.getState();

                        //PLUGIN
                        if (jQuery(e.target).parents('[data-html]').length == 0) {
                            plugin.settings.onContentClick(e);
                        }

                        //spacer
                        if (jQuery(e.target).hasClass('spacer')) {
                            var $spacer = jQuery(e.target);

                            jQuery("#divSpacerTool").data('active', $spacer);

                            plugin.renderSpacerTool();

                            jQuery("#divSpacerTool").css("display", "block");
                        } else {
                            jQuery("#divSpacerTool").css("display", "none");
                        }

                        //icon
                        if (jQuery(e.target).prop("tagName").toLowerCase() == 'i' && jQuery(e.target).html() == '') {

                            jQuery("#divIconTool").data('active', jQuery(e.target));
                            plugin.renderIconTool();

                            var $modal = jQuery('.is-modal.viewicons');
                            if($modal.hasClass('active')){

                                $modal.find('#ifrIconInsert').css('display', 'none');
                                $modal.find('#ifrIconEdit').css('display', 'block');
                                if ($modal.find('#ifrIconEdit').attr('src') == 'about:blank') {
                                    $modal.find('#ifrIconEdit').attr('src', plugin.settings.iconselect + '?mode=edit');
                                }

                            }

                            selectElementContents(e.target);
                        } else {

                            jQuery("#divIconTool").css("display", "none");

                        }

                        //Image (must be placed before //Link)
                        if (jQuery(e.target).prop("tagName").toLowerCase() == 'img') {

                            var $img = jQuery(e.target);

                            /* <img data-fixed src=".." /> (image must be fixed, cannot be replaced) */
                            var fixedimage = false;
                            var attr = $img.attr('data-fixed');
                            if (typeof attr !== typeof undefined && attr !== false) {
                                fixedimage = true;
                            }

                            if(!fixedimage) {
                                jQuery("#divImageTool").data('active', $img);

                                var _toolwidth = jQuery("#divImageTool").width();
                                var _width = $img.outerWidth();
                                var _top = $img.offset().top;
                                var _left = $img.offset().left - 2;
                                _left = _left + (_width - _toolwidth);

                                //Adjust _left in case an element is outside the screen
                                var _screenwidth = jQuery(window).width();
                                var _imagetoolwidth = jQuery("#divImageTool").width();
                                if(_imagetoolwidth+_left>_screenwidth) _left = $img.offset().left;//_left=_screenwidth-_imagetoolwidth-10;

                                jQuery("#divImageTool").css("top", _top + "px");
                                jQuery("#divImageTool").css("left", _left + "px");
                                jQuery("#divImageTool").css("display", "block");

                                //Image Resizer
                                if (typeof jQuery.ui !== 'undefined') {
                                    jQuery("#divImgResizer").css("top", $img.offset().top + "px");
                                    jQuery("#divImgResizer").css("left", $img.offset().left + "px");
                                    jQuery("#divImgResizer").css("width", $img.width() + "px");
                                    jQuery("#divImgResizer").css("height", $img.height() + "px");
                                    jQuery("#divImgResizer").css("display", "block");
                                    repositionHandler($img.width(), $img.height());

                                    //Get & save original image width
                                    var imgwidth = $img.get(0).style.width;
                                    if(imgwidth.indexOf('%')!=-1) {
                                        imgwidth = imgwidth.replace('%','')*1;
                                        var imgwidthpx = ($img.width()*100)/imgwidth;
                                    } else {
                                        var imgwidthpx = $img.width();
                                    }
                                    jQuery("#divImgResizer").data("width", Math.round(imgwidthpx));

                                    jQuery("#divImgResizer").trigger('click');

                                    if(bIsAppleMobile) jQuery(".cell-image").focus(); //dummy focus to prevent keyboard open
                                }
                            }
                        } else {
                            jQuery("#divImageTool").css("display", "none");
                            jQuery("#divImgResizer").css("display", "none");
                        }

                        //Link
                        if ((jQuery(e.target).prop("tagName").toLowerCase() == 'a' || jQuery(e.target).parents('a').length>0) && jQuery(e.target).parents('[data-html]').length==0) {

                            if (jQuery(e.target).prop("tagName").toLowerCase() == 'a') {
                                var $link = jQuery(e.target);
                            } else {
                                var $link = jQuery(e.target).parents('a').first();
                            }
                            jQuery("#divLinkTool").data('active', $link);

                            if ($link.children().length == 1) {
                                if ($link.children().first().prop("tagName").toLowerCase() == 'i' && $link.children().first().html() == '') {
                                    //icon
                                    jQuery("#divLinkTool").css("display", "none");
                                    return false;
                                }
                                if ($link.children().first().prop("tagName").toLowerCase() == 'img' && $link.children().first().html() == '') {
                                    //image that has link applied
                                    jQuery("#divLinkTool").css("display", "none");
                                    return false;
                                }
                            }

                            plugin.renderLinkTool();

                            //EXIT
                            plugin.saveSelection();
                            return false;

                        } else {
                            jQuery("#divLinkTool").css("display", "none");
                        }

                        //Table
                        if (jQuery(e.target).parents('table').length>0 /*&& !plugin.settings.emailMode*/) {

                            if(jQuery(e.target).parents('table').first().hasClass('default')) {
                                if (jQuery(e.target).prop("tagName").toLowerCase() == 'td') {
                                    var $cell = jQuery(e.target);
                                } else {
                                    var $cell = jQuery(e.target).parents('td').first();
                                }
                                jQuery("#divTableTool").data('active', $cell); //Save Active Cell

                                var $table = jQuery(e.target).parents('table').first();

                                var _toolwidth = jQuery("#divTableTool").width();
                                var _width = $table.outerWidth();
                                var _top = $table.offset().top;
                                var _left = $table.offset().left - 2;
                                _left = _left + (_width - _toolwidth);
                                jQuery("#divTableTool").css("top", _top + "px");
                                jQuery("#divTableTool").css("left", _left + "px");
                                jQuery("#divTableTool").css("display", "block");
                            } else {
                                jQuery("#divTableTool").css("display", "none");
                            }
                        } else {
                            jQuery("#divTableTool").css("display", "none");
                        }

                        //Iframe
                        if (!jQuery(e.target).hasClass('ovl')) {//iframe overlay
                            jQuery('.ovl').css('display', 'block');
                        }
                        if (jQuery(e.target).parents('.embed-responsive').length > 0) {

                            var $divIframe = jQuery(e.target).parents('.embed-responsive').first();
                            jQuery("#divIframeTool").data('active', $divIframe);

                            var _toolwidth = jQuery("#divIframeTool").width();
                            var _width = $divIframe.outerWidth();
                            var _top = $divIframe.offset().top;
                            var _left = $divIframe.offset().left - 2;
                            _left = _left + (_width - _toolwidth);
                            jQuery("#divIframeTool").css("top", _top + "px");
                            jQuery("#divIframeTool").css("left", _left + "px");
                            jQuery("#divIframeTool").css("display", "block");
                        } else {
                            jQuery("#divIframeTool").css("display", "none");
                        }

                        //Custom Code
                        if (customcode) {

                            var $customcode = jQuery(this);
                            jQuery("#divCustomCodeTool").data('active', $customcode);

                            var _toolwidth = jQuery("#divCustomCodeTool").width();
                            var _width = $customcode.get(0).clientWidth;
                            var _top = $customcode.offset().top - 1;
                            var _left = $customcode.offset().left - 1;
                            _left = _left + (_width - _toolwidth);
                            jQuery("#divCustomCodeTool").css("top", _top + "px");
                            jQuery("#divCustomCodeTool").css("left", _left + "px");
                            jQuery("#divCustomCodeTool").css("display", "block");
                        } else {
                            jQuery("#divCustomCodeTool").css("display", "none");
                        }

                        //Module
                        if (custommodule) {

                            var $custommodule = jQuery(this);
                            jQuery("#divCustomModuleTool").data('active', $custommodule);

                            var _toolwidth = jQuery("#divCustomModuleTool").width();
                            var _width = $customcode.get(0).clientWidth;
                            var _top = $customcode.offset().top - 1;
                            var _left = $customcode.offset().left - 1;
                            _left = _left + (_width - _toolwidth);
                            jQuery("#divCustomModuleTool").css("top", _top + "px");
                            jQuery("#divCustomModuleTool").css("left", _left + "px");
                            jQuery("#divCustomModuleTool").css("display", "block");

                            jQuery("#divCustomCodeTool").css("display", "none");
                        } else {
                            jQuery("#divCustomModuleTool").css("display", "none");
                        }

                        //save selection
                        //plugin.saveSelection();

                        //e.preventDefault();
                        //e.stopImmediatePropagation();
                        /*
                        if (jQuery(e.target).prop("tagName").toLowerCase() == 'a' || jQuery(e.target).parents('a').length==1) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }*/

                        if (jQuery(e.target).prop("tagName").toLowerCase() == 'a' || jQuery(e.target).parents('a').length>0) {
                            return false;
                        }

                        if (jQuery(e.target).parents('.is-builder').length>1) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }

                    });

                    // ON KEYDOWN

                    var oktoclean = false;

                    jQuery(this).off('keydown');
                    jQuery(this).off('keyup');

                    jQuery(this).on('keydown', function (e) {

                        plugin.renderRowAddTool();

                        //cleanup span with style
                        var $block = jQuery('#divCellTool').data('active');
                        if(!$block) return;

                        $block.find('span').each(function(){
                            jQuery(this).attr('data-keep','');
                        });
                        $block.find('*').each(function(){
                            var attr = jQuery(this).attr('style');
                            if (typeof attr !== typeof undefined && attr !== false) {
                                if(attr.indexOf('font-size')!=-1){
                                    jQuery(this).attr('data-keep-font-size','');
                                }
                                if(attr.indexOf('background-color')!=-1){
                                    jQuery(this).attr('data-keep-background-color','');
                                }
                                if(attr.indexOf('background')!=-1){
                                    jQuery(this).attr('data-keep-background','');
                                }
                                if(attr.indexOf('line-height')!=-1){
                                    jQuery(this).attr('data-keep-line-height','');
                                }
                            }
                        });
                        oktoclean=true;

                        if((e.ctrlKey || e.metaKey) && e.which == 86) {//CTRL-V
                            plugin.pasteContent();
                        }

                        if(plugin.settings.elementSelection) {

                            if((e.ctrlKey || e.metaKey) && e.which == 65) {//CTRL-A
                                var el;
                                var curr;
                                try{
                                    if (window.getSelection) {
                                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                                        el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
                                    }
                                    else if (document.selection) {
                                        curr = document.selection.createRange();
                                        el = document.selection.createRange().parentElement();
                                    }

                                    var el = jQuery(el).get(0);
                                    selectElementContents(el);

                                    e.preventDefault();

                                } catch(e) {}
                            }
                        }

                        if(e.keyCode==46) {
                            //console.log("delete");
                            var el;
                            var curr;
                            try{
                                if (window.getSelection) {
                                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                                    el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
                                }
                                else if (document.selection) {
                                    curr = document.selection.createRange();
                                    el = document.selection.createRange().parentElement();
                                }

                                if(jQuery(curr).html()=='<br>') {
                                    var $next = jQuery(curr).next();
                                    if($next.length>0){
                                        jQuery(curr).remove();
                                        e.preventDefault();
                                    }
                                }

                                //e.preventDefault();

                            } catch(e) {}
                        }

                    });


                    // ON KEYUP

                    jQuery(this).on('keyup', function (e) {

                        plugin.renderRowAddTool();

                        //cleanup span with style
                        var $block = jQuery('#divCellTool').data('active');
                        if(!$block) return;

                        $block.find('span').each(function(){
                            var attr = jQuery(this).attr('data-keep');
                            if (typeof attr !== typeof undefined && attr !== false) {

                            } else {
                                var s = jQuery(this).html();
                                jQuery(this).replaceWith(s);
                            }
                        });
                        //$block.find('[data-keep]').removeAttr('data-keep');

                        if(oktoclean){
                            $block.find('*').each(function(){
                                var attr = jQuery(this).attr('style');
                                if (typeof attr !== typeof undefined && attr !== false) {
                                    if(attr.indexOf('font-size')!=-1){
                                        var attrkeep = jQuery(this).attr('data-keep-font-size');
                                        if (typeof attrkeep !== typeof undefined && attrkeep !== false) {

                                        } else {
                                            jQuery(this).css('font-size','');
                                        }
                                    }
                                    if(attr.indexOf('background-color')!=-1){
                                        var attrkeep = jQuery(this).attr('data-keep-background-color');
                                        if (typeof attrkeep !== typeof undefined && attrkeep !== false) {

                                        } else {
                                            jQuery(this).css('background-color','');
                                        }
                                    }
                                    if(attr.indexOf('background')!=-1){
                                        var attrkeep = jQuery(this).attr('data-keep-background');
                                        if (typeof attrkeep !== typeof undefined && attrkeep !== false) {

                                        } else {
                                            jQuery(this).css('background','');
                                        }
                                    }
                                    if(attr.indexOf('line-height')!=-1){
                                        var attrkeep = jQuery(this).attr('data-keep-line-height');
                                        if (typeof attrkeep !== typeof undefined && attrkeep !== false) {

                                        } else {
                                            jQuery(this).css('line-height','');
                                        }
                                    }
                                }
                            });
                            $block.find('[data-keep-font-size]').removeAttr('data-keep-font-size');
                            $block.find('[data-keep-background-color]').removeAttr('data-keep-background-color');
                            $block.find('[data-keep-background]').removeAttr('data-keep-background');
                            $block.find('[data-keep-line-height]').removeAttr('data-keep-line-height');
                        }
                        oktoclean =false;

                        /*
                        if (e.keyCode == 13 && !e.shiftKey) {

                            //Save for Undo
                            plugin.saveForUndo();

                            document.execCommand('formatBlock', false, '<p>');

                        }*/

                        var el;
                        var curr;
                        try{
                            if (window.getSelection) {
                                curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                                el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
                            }
                            else if (document.selection) {
                                curr = document.selection.createRange();
                                el = document.selection.createRange().parentElement();
                            }
                        } catch(e) {return;} //Use try to prevent lost selection after undo

                        if (e.keyCode == 13 && !e.shiftKey){

                            //Save for Undo
                            plugin.saveForUndo();

                            var is_ie = detectIE();
                            if (is_ie>0) {

                            } else {
                                //So that enter at the end of list returns <p>
                                var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                                var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
                                var isOpera = window.opera;
                                var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                                if(isChrome || isOpera) {
                                    //Without this, pressing ENTER at the end of list will returns <p> on Chrome but then it become <div> (On Opera it returns <div>)
                                    //With this, we change it into <p>
                                    if(jQuery(el).prop("tagName").toLowerCase()=='p' || jQuery(el).prop("tagName").toLowerCase() =='div') {
                                        document.execCommand('formatBlock', false, '<p>');
                                    }
                                }
                                if(isFirefox) {
                                    //On FF (when enter at the end of list) jQuery(curr).html() returns undefined
                                    if(!jQuery(curr).html()) document.execCommand('formatBlock', false, '<p>');
                                }

                                /*
                                try{
                                    //cleanup span with style
                                    if (window.getSelection) {
                                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                                        el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
                                    }
                                    else if (document.selection) {
                                        curr = document.selection.createRange();
                                        el = document.selection.createRange().parentElement();
                                    }
                                    if(jQuery(curr).parents('p').length>0){
                                        if(jQuery(curr).parents('p').first().children('span').length == 1){
                                            var s = jQuery(curr).parents('p').first().children('span').first().html();
                                            jQuery(curr).parents('p').first().children('span').first().replaceWith(s);
                                        }
                                    }
                                } catch(e) {}
                                */

                            }

                            $block.find('[data-keep]').removeAttr('data-keep');
                        }

                        jQuery('.cell-active').find('.elm-active').removeClass('elm-active');
                        jQuery("#divElementTool").css("display", "none"); //force hide ellement tool

                        plugin.settings.onChange();
                    });

                });
            });

            this.checkEmpty();


            //If jQuery UI exists, create sorting behavior
            if (typeof jQuery.ui !== 'undefined') {

                try{
			        jQuery('.is-builder').sortable("destroy");
                } catch(e) {}

                jQuery('.is-builder').addClass('connectSortable');

                if(plugin.settings.animatedSorting) {

                    // https://stackoverflow.com/questions/54226112/how-to-use-jquery-ui-sortable-to-intersect-properly/54302048
                    var startIndex, changeIndex, uiHeight;

                    jQuery('.is-builder').each(function(){

                        var startIndex, changeIndex, uiHeight,
                        bRect = jQuery(this).children('div')[0].getBoundingClientRect(),
                        width = bRect.right - bRect.left,
                        height = bRect.bottom - bRect.top;

                        jQuery(this).sortable({

                            connectWith: '.connectSortable', distance: 5, delay: 200,
                            handle: '.row-handle',
                            cursor: 'move',
                            cancel: 'p,h1,h2,h3,h4,h5,h6,ul,ol,pre,blockquote,code,figcaption,label,legend,button,nav,small,span,u,em,strong,b,strike,i,var,time,sub,sup,cite,abbr,address,dl,del,ins,details,mark,meter,q,s',
                            tolerance: 'pointer',
                            //cursorAt: {top: height/2, left: width/2}, //try to use it with and without this option
                            placeholder: 'marker',

                            helper: function(event, ui){

                                //Fix incorrect helper position while sorting
                                //http://stackoverflow.com/questions/5791886/jquery-draggable-shows-helper-in-wrong-place-after-page-scrolled
                                var $clone =  jQuery(ui).clone();
                                $clone .css('position','absolute');

                                $clone.addClass('cloned-handler');
                                if (!$clone.parent().is('body')) {
                                    $clone.appendTo(jQuery('body'));
                                }

                                return $clone.get(0);

                            },

                            over: function(e, ui) {
                                jQuery('.is-builder').each(function(){
                                    if(jQuery(this).find('.marker').length>0) {
                                        jQuery(this).attr('draggridoutline','');
                                    } else {
                                        jQuery(this).removeAttr('draggridoutline');
                                        jQuery(this).children('div').css('transform','');
                                    }
                                });
                            },

                            out: function(e, ui) {
                                //jQuery('.is-builder[draggridoutline]').removeAttr('draggridoutline');
                            },

                            start: function(e, ui) {

                                jQuery('.is-builder').append('<div class="dummy-space" style="clear: both; line-height: 100px;outline:none !important;">&nbsp;</div>');

                                if(ui.item.find('.cell-active').length==0) {
                                    var $newactiveblock = ui.item.children('div').not('.is-row-tool').first();
                                    jQuery('#divCellTool').data('active', $newactiveblock);
                                }

                                plugin.hideElementTools();
                                jQuery(".is-row-tool").css("display", "");
                                jQuery("#divCellTool").css("display", "none");
                                jQuery('#divRowAddTool').css('display', 'none');
                                jQuery('.cell-active').removeClass('cell-active');
                                jQuery('.row-active').removeClass('row-active');
                                jQuery('.row-outline').removeClass('row-outline');
                                ui.item.addClass('row-active');

                                //-- smooth drag
                                startIndex = ui.placeholder.index();
                                uiHeight = ui.item.outerHeight(true);

                                if(ui.item.data('height')) uiHeight = ui.item.data('height'); //FIX HEIGHT

                                ui.item.nextAll('div:not(.marker)').css({
                                    transform: 'translateY(' +uiHeight+ 'px)'
                                });

                                ui.placeholder.css({
                                    height: 0,
                                    padding: 0
                                });
                                //-- /smooth drag
                            },

                            change: function(e, ui) {

                                //-- smooth drag
                                changeIndex = ui.placeholder.index();

                                var $builder = jQuery('.marker').parents('.is-builder').first();

                                if (startIndex > changeIndex) {

                                    var slice = $builder.children('div').slice(changeIndex, $builder.children('div').length);
                                    slice.not('.ui-sortable-helper').each(function() {
                                        var item = jQuery(this);
                                        item.css({
                                            transform: 'translateY(' +uiHeight+ 'px)'
                                        });
                                    });

                                } else if (startIndex < changeIndex) {

                                    var slice = $builder.children('div').slice(startIndex, changeIndex);
                                    slice.not('.ui-sortable-helper').each(function() {
                                        var item = jQuery(this);
                                        item.css({
                                            transform: 'translateY(0px)'
                                        });
                                    });
                                }

                                startIndex = changeIndex
                                //-- /smooth drag
                            },

                            stop: function(e, ui) {

                                //-- smooth drag
                                jQuery('.ui-sortable-handle').css({
                                    transform: 'translateY(0)'
                                });
                                //-- /smooth drag

                                jQuery('.is-builder > div').css('transition','none');
                                jQuery('.is-builder > div').css('transform','');
                                jQuery('.is-builder').removeAttr('draggridoutline');
                                setTimeout(function () {
                                    jQuery('.is-builder > div').css('transition','');
                                },300);

                                if(!bSnippetDropped) {
                                    //change to row selection
                                    var $block = jQuery('#divCellTool').data('active');
                                    plugin.renderLayoutTool();
                                    jQuery('.cell-active').removeClass('cell-active');
                                    jQuery('.row-active').removeClass('row-active');
                                    jQuery('.row-outline').removeClass('row-outline');
                                    $block.parent().addClass('row-active');
                                    jQuery("#divCellTool").css("display", "none");
                                    jQuery('#divRowAddTool').css('display', 'none');
                                }

                                jQuery('.dummy-space').remove();
                            },

                            deactivate: function (event, ui) {

                                //for cancelled dropping snippet
                                jQuery('.is-builder > div').css('transform','');
                                jQuery('.is-builder').removeAttr('draggridoutline');

                                //When sorting, sometimes helper not removed after sorted
                                jQuery(".cloned-handler").remove();

                                plugin.checkEmpty();

                            },

                            update: function(event, ui) {

                                var snippetid = jQuery(ui.item).data('id');
                                if(snippetid) {

                                    var framework = plugin.settings.framework;
                                    var snippetPathReplace = plugin.settings.snippetPathReplace;
                                    var emailMode = plugin.settings.emailMode;


                                    var result = jQuery.grep(data_basic.snippets, function (element, index) {
                                        return element.id == snippetid;
                                    });
                                    var html = result[0].html;
                                    var noedit = result[0].noedit;

                                    var bSnippet;
                                    if (html.indexOf('row clearfix') == -1) {
                                        bSnippet = true;
                                    } else {
                                        bSnippet = false;
                                    }
                                    if (emailMode) bSnippet = false;
                                    //html = html.replace(/contentbox\//g, '');

                                    //bootstrap
                                    if (framework == 'bootstrap') {
                                        html = html.replace(new RegExp(' container', 'g'), ' container-fluid');
                                        html = html.replace(new RegExp('btn btn-primary', 'g'), 'btn btn-primary btn-lg');
                                        html = html.replace(new RegExp('btn btn-default', 'g'), 'btn btn-default btn-lg');
                                    }

                                    //foundation
                                    if (framework == 'foundation') {
                                        html = html.replace(new RegExp('btn btn-primary', 'g'), 'button');
                                        html = html.replace(new RegExp('btn btn-default', 'g'), 'secondary button');
                                    }

                                    //material
                                    if (framework == 'material') {
                                        html = html.replace(new RegExp(' container', 'g'), '');
                                        html = html.replace(new RegExp('btn btn-primary', 'g'), 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent');
                                        html = html.replace(new RegExp('btn btn-default', 'g'), 'mdl-button mdl-js-button mdl-button--raised');
                                    }

                                    //uikit
                                    if (framework == 'uikit') {
                                        html = html.replace(new RegExp(' container', 'g'), ' uk-container uk-container-center');
                                        html = html.replace(new RegExp('row clearfix', 'g'), 'uk-grid');
                                        html = html.replace(new RegExp('column full', 'g'), 'uk-width-1-1');
                                        html = html.replace(new RegExp('column half', 'g'), 'uk-width-1-2');
                                        html = html.replace(new RegExp('column third', 'g'), 'uk-width-1-3');
                                        html = html.replace(new RegExp('column fourth', 'g'), 'uk-width-1-4');
                                        html = html.replace(new RegExp('column fifth', 'g'), 'uk-width-1-5');
                                        html = html.replace(new RegExp('column sixth', 'g'), 'uk-width-1-6');
                                        html = html.replace(new RegExp('column two-third', 'g'), 'uk-width-2-3');
                                        html = html.replace(new RegExp('column two-fourth', 'g'), 'uk-width-3-4');
                                        html = html.replace(new RegExp('column two-fifth', 'g'), 'uk-width-4-5');
                                        html = html.replace(new RegExp('column two-sixth', 'g'), 'uk-width-5-6');
                                        html = html.replace(new RegExp('btn btn-primary', 'g'), 'uk-button uk-button-primary uk-button-large');
                                        html = html.replace(new RegExp('btn btn-default', 'g'), 'uk-button uk-button-large');
                                    }

                                    //flex
                                    if (framework == 'flex') {
                                        html = html.replace(new RegExp('row clearfix', 'g'), 'row');
                                        html = html.replace(new RegExp('column full', 'g'), '');
                                        html = html.replace(new RegExp('column half', 'g'), '');
                                        html = html.replace(new RegExp('column third', 'g'), '');
                                        html = html.replace(new RegExp('column fourth', 'g'), '');
                                        html = html.replace(new RegExp('column fifth', 'g'), '');
                                        html = html.replace(new RegExp('column sixth', 'g'), '');
                                        html = html.replace(new RegExp('column two-third', 'g'), '');
                                        html = html.replace(new RegExp('column two-fourth', 'g'), '');
                                        html = html.replace(new RegExp('column two-fifth', 'g'), '');
                                        html = html.replace(new RegExp('column two-sixth', 'g'), '');
                                    }

                                    if(plugin.settings.classReplace.length>0){

                                        var classReplace = plugin.settings.classReplace;
                                        for(var i=0;i<=classReplace.length-1;i++){
                                            html = html.replace(new RegExp(classReplace[i][0], 'g'), classReplace[i][1]);
                                        }

                                    } else {

                                        //others (12 columns grid)
                                        var rowClass = plugin.settings.row; //row
                                        var colClass = plugin.settings.cols; //['col s1', 'col s2', 'col s3', 'col s4', 'col s5', 'col s6', 'col s7', 'col s8', 'col s9', 'col s10', 'col s11', 'col s12']
                                        if(rowClass!='' && colClass.length==12){
                                            html = html.replace(new RegExp('row clearfix', 'g'), rowClass);
                                            html = html.replace(new RegExp('column full', 'g'), colClass[11]);
                                            html = html.replace(new RegExp('column half', 'g'), colClass[5]);
                                            html = html.replace(new RegExp('column third', 'g'), colClass[3]);
                                            html = html.replace(new RegExp('column fourth', 'g'), colClass[2]);
                                            html = html.replace(new RegExp('column fifth', 'g'), colClass[1]);
                                            html = html.replace(new RegExp('column sixth', 'g'), colClass[1]);
                                            html = html.replace(new RegExp('column two-third', 'g'), colClass[7]);
                                            html = html.replace(new RegExp('column two-fourth', 'g'), colClass[8]);
                                            html = html.replace(new RegExp('column two-fifth', 'g'), colClass[9]);
                                            html = html.replace(new RegExp('column two-sixth', 'g'), colClass[9]);
                                        }

                                    }

                                    html = html.replace(/{id}/g, makeid());

                                    try {
                                        if (snippetPathReplace[0] != '') {
                                            var regex = new RegExp(snippetPathReplace[0], 'g');
                                            html = html.replace(regex, snippetPathReplace[1]);

                                            var string1 = snippetPathReplace[0].replace(/\//g, '%2F');
                                            var string2 = snippetPathReplace[1].replace(/\//g, '%2F');

                                            var regex2 = new RegExp(string1, 'g');
                                            html = html.replace(regex2, string2);
                                        }
                                    } catch (e) { }

                                    if (bSnippet) {

                                        //Buttons, line, social, video, map (Grid layout not included).
                                        //Can be inserted after current row, cell, element, or last row.

                                        var $snippet;

                                        if(plugin.settings.cols.length==0){
                                            var $tmpcell = jQuery(cellFormat);
                                        } else {
                                            var $tmpcell = jQuery('<div>').addClass(plugin.settings.cols[plugin.settings.cols.length-1]);
                                        }
                                        if (noedit) {
                                            $tmpcell.attr('data-noedit', '');
                                        }
                                        var $targetcell = $tmpcell.children();
                                        while( $targetcell.length ) {
                                            $targetcell = $targetcell.children();
                                        }
                                        $targetcell.end().html(html);

                                        if(plugin.settings.row==''){
                                            var $tmprow = jQuery(rowFormat);
                                        } else {
                                            var $tmprow = jQuery('<div>').addClass(plugin.settings.row);
                                        }
                                        var $targetrow = $tmprow.children();
                                        while( $targetrow.length ) {
                                            $targetrow = $targetrow.children();
                                        }
                                        $targetrow.end().html($tmpcell[0].outerHTML);

                                        $snippet = $tmprow;

                                        html = $snippet[0].outerHTML;

                                    } else {

                                        //Complete with grid layout. Also may containes custom script(data-html)
                                        //Can be inserted after current row or last row.
                                        var $snippet = jQuery('<div>').html(html);
                                        $snippet.find("[data-html]").each(function () {

                                            plugin.renderCustomCodeBlock(jQuery(this));

                                        });

                                        html = $snippet.html();

                                    }

                                    var sFunc = (plugin.settings.onAdd+'').replace( /\s/g, '');
                                    if(sFunc != 'function(){}'){
                                        html = plugin.settings.onAdd(html);
                                    }

                                    ui.item.replaceWith(html);

                                    plugin.applyBehavior();

                                    //Trigger Change event
                                    plugin.settings.onChange();

                                    //Trigger Render event
                                    plugin.settings.onRender();

                                    bSnippetDropped = true;

                                }

                            }

                        });

                    });
                    // /sortable

                } else {

                    jQuery('.is-builder').sortable({
                        connectWith: '.connectSortable', distance: 5, delay: 200,
                        handle: '.row-handle',
                        cursor: 'move',
                        cancel: 'p,h1,h2,h3,h4,h5,h6,ul,ol,pre,blockquote,code,figcaption,label,legend,button,nav,small,span,u,em,strong,b,strike,i,var,time,sub,sup,cite,abbr,address,dl,del,ins,details,mark,meter,q,s',
                        tolerance: 'pointer',
                        placeholder: 'block-placeholder',

                        helper: function(event, ui){

                            //Fix incorrect helper position while sorting
                            //http://stackoverflow.com/questions/5791886/jquery-draggable-shows-helper-in-wrong-place-after-page-scrolled
                            var $clone =  jQuery(ui).clone();
                            $clone .css('position','absolute');

                            $clone.addClass('cloned-handler');
                            if (!$clone.parent().is('body')) {
                                $clone.appendTo(jQuery('body'));
                            }

                            return $clone.get(0);

                        },

                        start: function(e, ui){

                            if(ui.item.find('.cell-active').length==0) {
                                var $newactiveblock = ui.item.children('div').not('.is-row-tool').first();
                                jQuery('#divCellTool').data('active', $newactiveblock);
                            }

                            //jQuery(this).data('newelement', 0);

                            plugin.hideElementTools();
                            jQuery(".is-row-tool").css("display", "");
                            jQuery("#divCellTool").css("display", "none");
                            jQuery('#divRowAddTool').css('display', 'none');
                            jQuery('.cell-active').removeClass('cell-active');
                            jQuery('.row-active').removeClass('row-active');
                            jQuery('.row-outline').removeClass('row-outline');
                            ui.item.addClass('row-active');

                            //uiHeight = ui.item.outerHeight(true);
                            //ui.placeholder.css({
                            //    height: uiHeight
                            //});

                            //jQuery(ui.placeholder).hide();
                            //jQuery(ui.placeholder).slideUp(80);
                        },
                        change: function (e, ui){
                            //jQuery(ui.placeholder).hide().slideDown(80);
                        },
                        beforeStop: function (e, ui) {
                            //jQuery(ui.placeholder).hide();
                        },


                        stop: function(e, ui) {

                            jQuery('.is-builder').removeAttr('draggridoutline');

                            if(!bSnippetDropped) {
                                //change to row selection
                                var $block = jQuery('#divCellTool').data('active');
                                plugin.renderLayoutTool();
                                jQuery('.cell-active').removeClass('cell-active');
                                jQuery('.row-active').removeClass('row-active');
                                jQuery('.row-outline').removeClass('row-outline');
                                $block.parent().addClass('row-active');
                                jQuery("#divCellTool").css("display", "none");
                                jQuery('#divRowAddTool').css('display', 'none');
                            }
                        },


                        deactivate: function (event, ui) {

                            //for cancelled dropping snippet
                            jQuery('.row-active').removeClass('row-active');

                            //When sorting, sometimes helper not removed after sorted
                            jQuery(".cloned-handler").remove();

                            plugin.checkEmpty();

                        },
                        update: function(event, ui) {

                            var snippetid = jQuery(ui.item).data('id');
                            if(snippetid) {

                                var framework = plugin.settings.framework;
                                var snippetPathReplace = plugin.settings.snippetPathReplace;
                                var emailMode = plugin.settings.emailMode;


                                var result = jQuery.grep(data_basic.snippets, function (element, index) {
                                    return element.id == snippetid;
                                });
                                var html = result[0].html;
                                var noedit = result[0].noedit;

                                var bSnippet;
                                if (html.indexOf('row clearfix') == -1) {
                                    bSnippet = true;
                                } else {
                                    bSnippet = false;
                                }
                                if (emailMode) bSnippet = false;
                                //html = html.replace(/contentbox\//g, '');

                                //bootstrap
                                if (framework == 'bootstrap') {
                                    html = html.replace(new RegExp(' container', 'g'), ' container-fluid');
                                    html = html.replace(new RegExp('btn btn-primary', 'g'), 'btn btn-primary btn-lg');
                                    html = html.replace(new RegExp('btn btn-default', 'g'), 'btn btn-default btn-lg');
                                }

                                //foundation
                                if (framework == 'foundation') {
                                    html = html.replace(new RegExp('btn btn-primary', 'g'), 'button');
                                    html = html.replace(new RegExp('btn btn-default', 'g'), 'secondary button');
                                }

                                //material
                                if (framework == 'material') {
                                    html = html.replace(new RegExp(' container', 'g'), '');
                                    html = html.replace(new RegExp('btn btn-primary', 'g'), 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent');
                                    html = html.replace(new RegExp('btn btn-default', 'g'), 'mdl-button mdl-js-button mdl-button--raised');
                                }

                                //uikit
                                if (framework == 'uikit') {
                                    html = html.replace(new RegExp(' container', 'g'), ' uk-container uk-container-center');
                                    html = html.replace(new RegExp('row clearfix', 'g'), 'uk-grid');
                                    html = html.replace(new RegExp('column full', 'g'), 'uk-width-1-1');
                                    html = html.replace(new RegExp('column half', 'g'), 'uk-width-1-2');
                                    html = html.replace(new RegExp('column third', 'g'), 'uk-width-1-3');
                                    html = html.replace(new RegExp('column fourth', 'g'), 'uk-width-1-4');
                                    html = html.replace(new RegExp('column fifth', 'g'), 'uk-width-1-5');
                                    html = html.replace(new RegExp('column sixth', 'g'), 'uk-width-1-6');
                                    html = html.replace(new RegExp('column two-third', 'g'), 'uk-width-2-3');
                                    html = html.replace(new RegExp('column two-fourth', 'g'), 'uk-width-3-4');
                                    html = html.replace(new RegExp('column two-fifth', 'g'), 'uk-width-4-5');
                                    html = html.replace(new RegExp('column two-sixth', 'g'), 'uk-width-5-6');
                                    html = html.replace(new RegExp('btn btn-primary', 'g'), 'uk-button uk-button-primary uk-button-large');
                                    html = html.replace(new RegExp('btn btn-default', 'g'), 'uk-button uk-button-large');
                                }

                                //flex
                                if (framework == 'flex') {
                                    html = html.replace(new RegExp('row clearfix', 'g'), 'row');
                                    html = html.replace(new RegExp('column full', 'g'), '');
                                    html = html.replace(new RegExp('column half', 'g'), '');
                                    html = html.replace(new RegExp('column third', 'g'), '');
                                    html = html.replace(new RegExp('column fourth', 'g'), '');
                                    html = html.replace(new RegExp('column fifth', 'g'), '');
                                    html = html.replace(new RegExp('column sixth', 'g'), '');
                                    html = html.replace(new RegExp('column two-third', 'g'), '');
                                    html = html.replace(new RegExp('column two-fourth', 'g'), '');
                                    html = html.replace(new RegExp('column two-fifth', 'g'), '');
                                    html = html.replace(new RegExp('column two-sixth', 'g'), '');
                                }

                                if(plugin.settings.classReplace.length>0){

                                    var classReplace = plugin.settings.classReplace;
                                    for(var i=0;i<=classReplace.length-1;i++){
                                        html = html.replace(new RegExp(classReplace[i][0], 'g'), classReplace[i][1]);
                                    }

                                } else {

                                    //others (12 columns grid)
                                    var rowClass = plugin.settings.row; //row
                                    var colClass = plugin.settings.cols; //['col s1', 'col s2', 'col s3', 'col s4', 'col s5', 'col s6', 'col s7', 'col s8', 'col s9', 'col s10', 'col s11', 'col s12']
                                    if(rowClass!='' && colClass.length==12){
                                        html = html.replace(new RegExp('row clearfix', 'g'), rowClass);
                                        html = html.replace(new RegExp('column full', 'g'), colClass[11]);
                                        html = html.replace(new RegExp('column half', 'g'), colClass[5]);
                                        html = html.replace(new RegExp('column third', 'g'), colClass[3]);
                                        html = html.replace(new RegExp('column fourth', 'g'), colClass[2]);
                                        html = html.replace(new RegExp('column fifth', 'g'), colClass[1]);
                                        html = html.replace(new RegExp('column sixth', 'g'), colClass[1]);
                                        html = html.replace(new RegExp('column two-third', 'g'), colClass[7]);
                                        html = html.replace(new RegExp('column two-fourth', 'g'), colClass[8]);
                                        html = html.replace(new RegExp('column two-fifth', 'g'), colClass[9]);
                                        html = html.replace(new RegExp('column two-sixth', 'g'), colClass[9]);
                                    }

                                }

                                html = html.replace(/{id}/g, makeid());

                                try {
                                    if (snippetPathReplace[0] != '') {
                                        var regex = new RegExp(snippetPathReplace[0], 'g');
                                        html = html.replace(regex, snippetPathReplace[1]);

                                        var string1 = snippetPathReplace[0].replace(/\//g, '%2F');
                                        var string2 = snippetPathReplace[1].replace(/\//g, '%2F');

                                        var regex2 = new RegExp(string1, 'g');
                                        html = html.replace(regex2, string2);
                                    }
                                } catch (e) { }

                                if (bSnippet) {

                                    //Buttons, line, social, video, map (Grid layout not included).
                                    //Can be inserted after current row, cell, element, or last row.

                                    var $snippet;

                                    if(plugin.settings.cols.length==0){
                                        var $tmpcell = jQuery(cellFormat);
                                    } else {
                                        var $tmpcell = jQuery('<div>').addClass(plugin.settings.cols[plugin.settings.cols.length-1]);
                                    }
                                    if (noedit) {
                                        $tmpcell.attr('data-noedit', '');
                                    }
                                    var $targetcell = $tmpcell.children();
                                    while( $targetcell.length ) {
                                        $targetcell = $targetcell.children();
                                    }
                                    $targetcell.end().html(html);

                                    if(plugin.settings.row==''){
                                        var $tmprow = jQuery(rowFormat);
                                    } else {
                                        var $tmprow = jQuery('<div>').addClass(plugin.settings.row);
                                    }
                                    var $targetrow = $tmprow.children();
                                    while( $targetrow.length ) {
                                        $targetrow = $targetrow.children();
                                    }
                                    $targetrow.end().html($tmpcell[0].outerHTML);

                                    $snippet = $tmprow;

                                    html = $snippet[0].outerHTML;

                                } else {

                                    //Complete with grid layout. Also may containes custom script(data-html)
                                    //Can be inserted after current row or last row.
                                    var $snippet = jQuery('<div>').html(html);
                                    $snippet.find("[data-html]").each(function () {

                                        plugin.renderCustomCodeBlock(jQuery(this));

                                    });

                                    html = $snippet.html();

                                }

                                var sFunc = (plugin.settings.onAdd+'').replace( /\s/g, '');
                                if(sFunc != 'function(){}'){
                                    html = plugin.settings.onAdd(html);
                                }

                                ui.item.replaceWith(html);

                                plugin.applyBehavior();

                                //Trigger Change event
                                plugin.settings.onChange();

                                //Trigger Render event
                                plugin.settings.onRender();

                                bSnippetDropped = true;
                            }

                        }


                    });
                    // /sortable
                }

                if(plugin.settings.dragWithoutHandle) {
                    jQuery('.is-builder').sortable( "option", "handle", "" );
                }

            }

        };
        // /applyBehavior


        plugin.checkEmpty = function () {
            //If there is empty container
            jQuery('.is-builder').each(function () {
                if (jQuery(this).children().length == 0) {
                    jQuery(this).html('<button class="row-add-initial">Empty<br><span>+ Click to add content</span></div>');
                    jQuery(this).find('.row-add-initial').on('click', function (e) {

                        jQuery('#divCellTool').data('active', jQuery(this).find('span')); //Use button>span as if it is an active column (to make a reference point where new content will be inserted)

                        jQuery(".cell-add-options").data('mode', 'row');

                        var _top = jQuery(this).offset().top + 88;
                        var _left = jQuery(this).offset().left;

                        jQuery(".cell-add-options").css("top", _top + "px");
                        jQuery(".cell-add-options").css("left", _left + "px");
                        jQuery(".cell-add-options").css("display", "block");
                        jQuery(".cell-add-options").removeClass("arrow-right");
                        jQuery(".cell-add-options").removeClass("arrow-left");
                        jQuery(".cell-add-options").removeClass("arrow-bottom");
                        jQuery(".cell-add-options").addClass("arrow-top");
                        jQuery(".cell-add-options").addClass("center");

                        var _screenwidth = jQuery(window).width();
                        if(_screenwidth <= 640) {
                            jQuery(".cell-add-options").css("display", "flex");
                        } else {
                            jQuery(".cell-add-options").css("display",  "block");
                        }
                        jQuery('.cell-add-options .is-pop-close').off('click');
                        jQuery('.cell-add-options .is-pop-close').on('click', function (e) {
                            jQuery(".cell-add-options").css("display", "none");
                        });

                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });
                } else if (jQuery(this).children().length == 1 && jQuery(this).find('.row-add-initial').length==1) {

                } else {
                    jQuery(this).find('.row-add-initial').remove();
                }
            });
        };

        plugin.getState = function () {

            if (document.queryCommandState("bold")) {
                jQuery('button[data-command=bold]').addClass('on');
            } else {
                jQuery('button[data-command=bold]').removeClass('on');
            }
            if (document.queryCommandState("italic")) {
                jQuery('button[data-command=italic]').addClass('on');
            } else {
                jQuery('button[data-command=italic]').removeClass('on');
            }
            if (document.queryCommandState("underline")) {
                jQuery('button[data-command=underline]').addClass('on');
            } else {
                jQuery('button[data-command=underline]').removeClass('on');
            }
            if (document.queryCommandState("strikethrough")) {
                jQuery('[data-command=strikethrough]').addClass('on');
            } else {
                jQuery('[data-command=strikethrough]').removeClass('on');
            }
            if (document.queryCommandState("superscript")) {
                jQuery('[data-command=superscript]').addClass('on');
            } else {
                jQuery('[data-command=superscript]').removeClass('on');
            }
            if (document.queryCommandState("subscript")) {
                jQuery('[data-command=subscript]').addClass('on');
            } else {
                jQuery('[data-command=subscript]').removeClass('on');
            }

            try {
                var el;
                var curr;
                if (window.getSelection) {
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if (curr.nodeType == 3) {  //ini text node
                        el = curr.parentNode;
                    } else {
                        el = curr;
                    }
                }
                else if (document.selection) {
                    curr = document.selection.createRange();
                    el = document.selection.createRange().parentElement();
                }
                if (jQuery(el).css('text-transform') == 'uppercase') {
                    jQuery('[data-command=uppercase]').addClass('on');
                } else {
                    jQuery('[data-command=uppercase]').removeClass('on');
                }

            } catch (e) {

            }

            if (document.queryCommandState("JustifyFull")) {
                jQuery('[data-align=justify]').addClass('on');
            } else {
                jQuery('[data-align=justify]').removeClass('on');
            }
            if (document.queryCommandState("JustifyLeft")) {
                jQuery('[data-align=left]').addClass('on');
            } else {
                jQuery('[data-align=left]').removeClass('on');
            }
            if (document.queryCommandState("JustifyRight")) {
                jQuery('[data-align=right]').addClass('on');
            } else {
                jQuery('[data-align=right]').removeClass('on');
            }
            if (document.queryCommandState("JustifyCenter")) {
                jQuery('[data-align=center]').addClass('on');
            } else {
                jQuery('[data-align=center]').removeClass('on');
            }

            var s = document.queryCommandValue("FontName");
            var fontname = s.split(',')[0];
            fontname = fontname.replace('"','').replace('"','');
            fontname = jQuery.trim(fontname).toLowerCase();

            if(jQuery('.cell-fontfamily').length>0){
                if(jQuery('.cell-fontfamily-options').find('iframe').attr('src') == 'about:blank') {
                    jQuery('.cell-fontfamily-options').find('iframe').attr('src', scriptPath+'fonts.html?11');
                }
            }

            jQuery('.cell-fontfamily-options').find('iframe').contents().find('[data-font-family]').removeClass('on');
            jQuery('.cell-fontfamily-options').find('iframe').contents().find('[data-font-family]').each(function(){
                var f = jQuery(this).attr('data-font-family');
                f = f.split(',')[0];
                f = jQuery.trim(f).toLowerCase();

                if(f==fontname && f!='') {
                    jQuery(this).addClass('on');
                }
            });

            jQuery('.cell-block-options [data-block]').removeClass('on');

            var block = document.queryCommandValue("FormatBlock");
            block = block.toLowerCase();

            if (block == 'normal') block = 'p';
            if (block == 'heading 1') block = 'h1';
            if (block == 'heading 2') block = 'h2';
            if (block == 'heading 3') block = 'h3';
            if (block == 'heading 4') block = 'h4';
            if (block == 'formatted') block = 'pre';

            if (block == 'p' || block == 'h1' || block == 'h2' || block == 'h3' || block == 'h4' || block == 'pre') {
                jQuery('.cell-block-options [data-block=' + block + ']').addClass('on');
            }
            return false;
        };

        //TOOL RENDER RELATED METHODS

        //Editing Toolbar (needed for top only)
        plugin.positionToolbar = function() {
            var $rtetool = jQuery('#divRteTool');

            if(plugin.settings.toolbar=='top'){

                var _screenwidth = jQuery(window).width();

                //top
                $rtetool.css('top', '30px');
                if(_screenwidth<=640) $rtetool.css('top', '12px');

                //left
                var _width = $rtetool.outerWidth();
                var _left = (_screenwidth / 2) - (_width / 2);// + 10; //10 => visual adjustment (optional)
                $rtetool.css("left", _left + "px");

                if(plugin.settings.scrollableEditingToolbar) {
                    //width
                    $rtetool.css('width', '');

                } else {
                    //width
                    var _newwidth = jQuery('.cell-tool-option-container').width();
                    $rtetool.css('width', (_newwidth + 7) +'px');
                }

                //height
                $rtetool.css('height', '45px');
            }
            else {
                //top
                $rtetool.css('top', '165px');

                //left (from css)

                //width
                $rtetool.css('width', '51px');

                //height
                var _newheight = parseInt(jQuery('.cell-tool-option-container').height());
                $rtetool.css('height', (_newheight + 7) +'px');
            }

            if(bIsAppleMobile) {
                $rtetool.detach().prependTo("body");
                $rtetool.css('position','sticky');
            }

        };

        plugin.refreshToolbar = function() {

            var currentrtewidth = jQuery('#divRteTool').outerWidth();

            //apply fixed width to rte
            var numOfRteButtons = jQuery('.cell-tool-option-container').first().children().first().children('button').length;
            var buttonWidth = 51;//(jQuery('.cell-tool-option-container').first().children().first().children('button').first().outerWidth()); //on emailMode returns 53, use fixed
            var buttonHeight = 45;//(jQuery('.cell-tool-option-container').first().children().first().children('button').first().outerHeight());

            if(plugin.settings.toolbar=='top'){
                var rtewidth = buttonWidth*numOfRteButtons;
                if(plugin.settings.scrollableEditingToolbar) {
                    jQuery('.cell-tool-option-container > div').css('width',rtewidth+'px');
                    jQuery('.cell-tool-option-container > div').css('height',buttonHeight+'px');
                    jQuery('.cell-tool-option-container').css('width',(buttonWidth*7)+'px');
                    jQuery('.cell-tool-option-container').css('height',buttonHeight+'px');
                    jQuery('#divRteTool > .is-draggable').css('width','5px');
                    jQuery('#divRteTool > .is-draggable').css('height',buttonHeight+'px');
                } else {
                    jQuery('.cell-tool-option-container > div').css('width',rtewidth+'px');
                    jQuery('.cell-tool-option-container > div').css('height',buttonHeight+'px');
                    jQuery('.cell-tool-option-container').css('width',rtewidth+'px');
                    jQuery('.cell-tool-option-container').css('height',buttonHeight+'px');
                    jQuery('#divRteTool > .is-draggable').css('width','5px');
                    jQuery('#divRteTool > .is-draggable').css('height',buttonHeight+'px');
                }
            } else {
                var rteheight = buttonHeight*numOfRteButtons;
                jQuery('.cell-tool-option-container > div').css('width',buttonWidth+'px');
                jQuery('.cell-tool-option-container > div').css('height',rteheight+'px');
                jQuery('.cell-tool-option-container').css('height',rteheight+'px');
                jQuery('.cell-tool-option-container').css('width',buttonWidth+'px');
                jQuery('#divRteTool > .is-draggable').css('width',buttonWidth+'px');
                jQuery('#divRteTool > .is-draggable').css('height','5px');
            }

            if(plugin.settings.toolbar=='top'){
                if(plugin.settings.scrollableEditingToolbar) {
                    if(jQuery('.cell-tool-next').css('display')=='none' && jQuery('.cell-tool-prev').css('display')=='none') { //if previous is non scrollable (width=rtewidth). If previous is already scrollable, no need to change.
                        jQuery('.cell-tool-option-container').css('width',(buttonWidth*7)+'px');
                        jQuery('.cell-tool-next').css('display','');
                    }
                } else {
                    jQuery('.cell-tool-option-container').css('width',rtewidth+'px');
                    jQuery('.cell-tool-option-container > div').css('left', '0px');

                    jQuery('.cell-tool-next').css('display','none');
                    jQuery('.cell-tool-prev').css('display', 'none');
                }
            } else {
                jQuery('.cell-tool-option-container > div').css('left', '0px');
            }

            //Visibility
            if(plugin.settings.toolbarDisplay=='auto'){
                jQuery('#divRteTool').removeClass('always');
            } else {
                jQuery('#divRteTool').addClass('always');
            }

            //Position
            if(plugin.settings.toolbar=='left' && !jQuery('#divRteTool').hasClass('left')) {
                jQuery('#divRteTool').addClass('left');
                jQuery('#divRteTool').removeClass('right');

                jQuery('.cell-align-options').addClass('arrow-left');
                jQuery('.cell-list-options').addClass('arrow-left');
                jQuery('.cell-block-options').addClass('arrow-left');
                jQuery('.cell-textformat-options').addClass('arrow-left');
                jQuery('.cell-textsetting-options').addClass('arrow-left');
                jQuery('.cell-fontfamily-options').addClass('arrow-left');
                jQuery('.cell-color-options').addClass('arrow-left');
                jQuery('.cell-tag-options').addClass('arrow-left');
                jQuery('.cell-rtemore-options').addClass('arrow-left');

                jQuery('.cell-align-options').removeClass('arrow-right');
                jQuery('.cell-list-options').removeClass('arrow-right');
                jQuery('.cell-block-options').removeClass('arrow-right');
                jQuery('.cell-textformat-options').removeClass('arrow-right');
                jQuery('.cell-textsetting-options').removeClass('arrow-right');
                jQuery('.cell-fontfamily-options').removeClass('arrow-right');
                jQuery('.cell-color-options').removeClass('arrow-right');
                jQuery('.cell-tag-options').removeClass('arrow-right');
                jQuery('.cell-rtemore-options').removeClass('arrow-right');

                jQuery('.cell-align-options').removeClass('arrow-top');
                jQuery('.cell-list-options').removeClass('arrow-top');
                jQuery('.cell-block-options').removeClass('arrow-top');
                jQuery('.cell-textformat-options').removeClass('arrow-top');
                jQuery('.cell-textsetting-options').removeClass('arrow-top');
                jQuery('.cell-fontfamily-options').removeClass('arrow-top');
                jQuery('.cell-color-options').removeClass('arrow-top');
                jQuery('.cell-tag-options').removeClass('arrow-top');
                jQuery('.cell-rtemore-options').removeClass('arrow-top');

                jQuery('.cell-tool-next').css('display','none');
                jQuery('.cell-tool-prev').css('display', 'none');
            }
            if(plugin.settings.toolbar=='right' && !jQuery('#divRteTool').hasClass('right')) {
                jQuery('#divRteTool').addClass('right');
                jQuery('#divRteTool').removeClass('left');

                jQuery('.cell-align-options').addClass('arrow-right');
                jQuery('.cell-list-options').addClass('arrow-right');
                jQuery('.cell-block-options').addClass('arrow-right');
                jQuery('.cell-textformat-options').addClass('arrow-right');
                jQuery('.cell-textsetting-options').addClass('arrow-right');
                jQuery('.cell-fontfamily-options').addClass('arrow-right');
                jQuery('.cell-color-options').addClass('arrow-right');
                jQuery('.cell-tag-options').addClass('arrow-right');
                jQuery('.cell-rtemore-options').addClass('arrow-right');

                jQuery('.cell-align-options').removeClass('arrow-left');
                jQuery('.cell-list-options').removeClass('arrow-left');
                jQuery('.cell-block-options').removeClass('arrow-left');
                jQuery('.cell-textformat-options').removeClass('arrow-left');
                jQuery('.cell-textsetting-options').removeClass('arrow-left');
                jQuery('.cell-fontfamily-options').removeClass('arrow-left');
                jQuery('.cell-color-options').removeClass('arrow-left');
                jQuery('.cell-tag-options').removeClass('arrow-left');
                jQuery('.cell-rtemore-options').removeClass('arrow-left');

                jQuery('.cell-align-options').removeClass('arrow-top');
                jQuery('.cell-list-options').removeClass('arrow-top');
                jQuery('.cell-block-options').removeClass('arrow-top');
                jQuery('.cell-textformat-options').removeClass('arrow-top');
                jQuery('.cell-textsetting-options').removeClass('arrow-top');
                jQuery('.cell-fontfamily-options').removeClass('arrow-top');
                jQuery('.cell-color-options').removeClass('arrow-top');
                jQuery('.cell-tag-options').removeClass('arrow-top');
                jQuery('.cell-rtemore-options').removeClass('arrow-top');

                jQuery('.cell-tool-next').css('display','none');
                jQuery('.cell-tool-prev').css('display', 'none');
            }
            if(plugin.settings.toolbar=='top' && (jQuery('#divRteTool').hasClass('left') || jQuery('#divRteTool').hasClass('right'))) {
                jQuery('#divRteTool').removeClass('left');
                jQuery('#divRteTool').removeClass('right');

                jQuery('.cell-align-options').addClass('arrow-top');
                jQuery('.cell-list-options').addClass('arrow-top');
                jQuery('.cell-block-options').addClass('arrow-top');
                jQuery('.cell-textformat-options').addClass('arrow-top');
                jQuery('.cell-textsetting-options').addClass('arrow-top');
                jQuery('.cell-fontfamily-options').addClass('arrow-top');
                jQuery('.cell-color-options').addClass('arrow-top');
                jQuery('.cell-tag-options').addClass('arrow-top');
                jQuery('.cell-rtemore-options').addClass('arrow-top');

                jQuery('.cell-align-options').removeClass('arrow-right');
                jQuery('.cell-list-options').removeClass('arrow-right');
                jQuery('.cell-block-options').removeClass('arrow-right');
                jQuery('.cell-textformat-options').removeClass('arrow-right');
                jQuery('.cell-textsetting-options').removeClass('arrow-right');
                jQuery('.cell-fontfamily-options').removeClass('arrow-right');
                jQuery('.cell-color-options').removeClass('arrow-right');
                jQuery('.cell-tag-options').removeClass('arrow-right');
                jQuery('.cell-rtemore-options').removeClass('arrow-right');

                jQuery('.cell-align-options').removeClass('arrow-left');
                jQuery('.cell-list-options').removeClass('arrow-left');
                jQuery('.cell-block-options').removeClass('arrow-left');
                jQuery('.cell-textformat-options').removeClass('arrow-left');
                jQuery('.cell-textsetting-options').removeClass('arrow-left');
                jQuery('.cell-fontfamily-options').removeClass('arrow-left');
                jQuery('.cell-color-options').removeClass('arrow-left');
                jQuery('.cell-tag-options').removeClass('arrow-left');
                jQuery('.cell-rtemore-options').removeClass('arrow-left');
            }

            //Position RTE tool (fixed)
            plugin.positionToolbar();

            initialRteWidth = jQuery('.cell-tool-option-container').outerWidth(); //360px
        };

        //Link Tool
        plugin.renderLinkTool = function() {
            var $link = jQuery("#divLinkTool").data('active');

            if($link.css('display') == 'inline-block') {
                jQuery("#divLinkTool").find('.link-duplicate').css('display','block');
                jQuery("#divLinkTool").find('.link-remove').css('display','block');
                jQuery("#divCellTool").css("display", "none");
            } else  {
                jQuery("#divLinkTool").find('.link-duplicate').css('display','none');
                jQuery("#divLinkTool").find('.link-remove').css('display','none');
            }

            var _toolwidth = jQuery("#divLinkTool").width();
            var _toolheight = jQuery("#divLinkTool").height();
            var _width = $link.outerWidth();
            var _height = $link.outerHeight();
            var _top = $link.offset().top;
            var _left = $link.offset().left;
            _left = _left + (_width - _toolwidth);
            _top = _top - _toolheight + 1;
            jQuery("#divLinkTool").css("top", _top + "px");
            jQuery("#divLinkTool").css("left", _left + "px");
            jQuery("#divLinkTool").css("display", "block");
        };

        //Icon Tool
        plugin.renderIconTool = function () {
            var $icon = jQuery("#divIconTool").data('active');
            if ($icon.parent().prop("tagName").toLowerCase() == 'a' && $icon.parent().children().length == 1) {
                //link icon
                jQuery('#divIconTool').find('.icon-link').css('display', 'block');
                jQuery('#divIconTool').find('.icon-add').css('display', 'block');
                jQuery('#divIconTool').find('.icon-remove').css('display', 'block');
            } else {
                jQuery('#divIconTool').find('.icon-link').css('display', 'none');
                jQuery('#divIconTool').find('.icon-add').css('display', 'none');
                jQuery('#divIconTool').find('.icon-remove').css('display', 'block');
            }

            var _toolheight = jQuery("#divIconTool").height();
            var _height = $icon.outerHeight();
            var _top = $icon.offset().top;
            if (_height > 80) {
                _top = _top + _height - 80;
            }
            var _left = $icon.offset().left;
            _top = _top - _toolheight + 1;
            jQuery("#divIconTool").css("top", _top + "px");
            jQuery("#divIconTool").css("left", _left + "px");
            jQuery("#divIconTool").css("display", "block");
        };

        //Spacer tool
        plugin.renderSpacerTool = function () {

            var $spacer = jQuery("#divSpacerTool").data('active');
            if ($spacer) {
                var _toolwidth = jQuery("#divSpacerTool").width();
                var _toolheight = jQuery("#divSpacerTool").height();
                var _width = $spacer.width();
                var _height = $spacer.height();
                var _top = $spacer.offset().top;
                var _left = $spacer.offset().left;
                _left = _left + (_width - _toolwidth) / 2;
                _top = _top + (_height - _toolheight) / 2;
                jQuery("#divSpacerTool").css("top", _top + "px");
                jQuery("#divSpacerTool").css("left", _left + "px");
            }
        };

        //Row Add tool
        plugin.renderRowAddTool = function () {

            var $block = jQuery('#divCellTool').data('active');
            if(!$block) return;

            var _width = $block.parent().width() + 40;
            var _height = $block.parent().height();
            var _top = $block.parent().offset().top + _height - 1;
            var _left = $block.parent().offset().left - 20;
            jQuery("#divRowAddTool").css("width", _width + "px");
            jQuery("#divRowAddTool").css("top", _top + "px");
            jQuery("#divRowAddTool").css("left", _left + "px");

        };

        //Element tool
        plugin.renderElementTool = function () {

            var $el = jQuery("#divElementTool").data('active');

            if (!$el) {
                return;
            }
            /*
            if (!$el) {
            var $block = jQuery('#divCellTool').data('active');
            $el = $block.children().first();
            }*/
            //if ($el.prev().length > 0) console.log('prev ' + $el.prev().prop("tagName").toLowerCase());
            //if ($el.next().length > 0) console.log('next ' + $el.next().prop("tagName").toLowerCase());

            //--------- Moving ----------

            if ($el.prev().length == 0) {

                //jQuery('#divElementTool .element-up').css('display', 'none');
                var attr = $el.parent().attr('contenteditable');
                if (typeof attr !== typeof undefined && attr !== false) {
                    //parent is cell
                    jQuery('#divElementTool .element-up').css('display', 'none');
                } else {
                    //parent is another element (still inside cell)
                    if ($el.parent().prev().length == 0) {
                        jQuery('#divElementTool .element-up').css('display', 'none');
                    } else {
                        jQuery('#divElementTool .element-up').css('display', 'block');
                    }
                }


            } else {
                jQuery('#divElementTool .element-up').css('display', 'block');
            }
            if ($el.next().length == 0) {

                //jQuery('#divElementTool .element-down').css('display', 'none');
                var attr = $el.parent().attr('contenteditable');
                if (typeof attr !== typeof undefined && attr !== false) {
                    //parent is cell
                    jQuery('#divElementTool .element-down').css('display', 'none');
                } else {
                    //parent is another element (still inside cell)
                    if ($el.parent().next().length == 0) {
                        jQuery('#divElementTool .element-down').css('display', 'none');
                    } else {
                        jQuery('#divElementTool .element-down').css('display', 'block');
                    }
                }

            } else {
                jQuery('#divElementTool .element-down').css('display', 'block');
            }

            //--------- /Moving ----------

            var $block = jQuery('#divCellTool').data('active');

            if(plugin.settings.emailMode){
                jQuery('#divElementTool .element-add').css("display", "none");
                jQuery('#divElementTool .element-duplicate').css("display", "none");
                jQuery('#divElementTool .element-remove').css("display", "none");
            }

            var _width = jQuery('#divElementTool').outerWidth();
            var _top = $el.offset().top + $el.outerHeight();
            var _left = $el.offset().left + $el.outerWidth() - _width;

            //if($builder.offset().left>_left){
            //    _left = $el.offset().left;
            //}

            //Adjust _left in case an element is outside the screen
            var _screenwidth = jQuery(window).width();
            var _elmtoolwidth = jQuery("#divElementTool").width();
            if(_elmtoolwidth+_left>_screenwidth)_left=_screenwidth-_elmtoolwidth-10;

            if($el.prop("tagName").toLowerCase()=='img'){
                _left=_left-12;

                if($el.outerWidth() <= (jQuery("#divElementTool").width() + 50) ) {
                    _left=_left+12; //rollback
                    _left = _left + (jQuery("#divElementTool").width()-$el.outerWidth())/2;
                    _top = _top + 10; //adjust top only
                }
            }

            jQuery("#divElementTool").css("top", _top + "px");
            jQuery("#divElementTool").css("left", _left + "px");

            //if block is code, hide element tool (block contenteditable=false)
            var attr = $block.attr('data-noedit');
            if (typeof attr !== typeof undefined && attr !== false) {
                jQuery("#divElementTool").css("display", "none");
            }

            /*
            if(!plugin.settings.elementTool) {
                jQuery("#divElementTool").css("display", "none");
            }*/

            /*
                Grid Editor has 'Element Tool' button to show/hide Element tool.
                If Grid Editor is active, Element tool visibility is based on plugin.settings.elementTool.
                If Grid Editor is not active (normal), Element tool visibility is based on Local Storage (if has set). If not, based on plugin.settings.elementTool (as originally set).
            */
            if(jQuery('.grideditor').hasClass('active')) {
                if(!plugin.settings.elementTool) {
                    jQuery("#divElementTool").css("display", "none");
                }
            }  else {
                if (localStorage.getItem("_hideelementtool") != null) {
                    if(localStorage.getItem("_hideelementtool")=='1'){
                        jQuery("#divElementTool").css("display", "none");
                    }
                } else {
                    if(!plugin.settings.elementTool) {
                        jQuery("#divElementTool").css("display", "none");
                    }
                }
            }


        };

        //Layout tool
        plugin.renderLayoutTool = function (rowAction, controlStay) {

            var $block = jQuery('#divCellTool').data('active');
            if(!$block) return;
            if($block.length==0) return; //Sorting with no active block

            //enable/disable buttons

            var attr = $block.attr('contenteditable');
            if (typeof attr !== typeof undefined && attr !== false) {
                jQuery('.cell-html').css('display', ''); //content is editable
            } else {
                jQuery('.cell-html').css('display', 'none'); //content is not editable
            }
            $block.parent().find('.row-html').css('display', 'none');
            $block.parent().children().not('.is-row-tool').each(function () {
                attr = jQuery(this).attr('contenteditable');
                if (typeof attr !== typeof undefined && attr !== false) {
                    $block.parent().find('.row-html').css('display', ''); //content is editable
                } else {

                }
            });


            if ($block.parent().children().not('.is-row-tool').length == 1) {
                if (typeof attr !== typeof undefined && attr !== false) {
                    jQuery('.row-html').css('display', '');
                } else {
                    jQuery('.row-html').css('display', 'none');
                }
            }

            //Hide duplicate button if current block is a component
            var attr = $block.attr('data-html');
            if (typeof attr !== typeof undefined && attr !== false) {
                jQuery('.cell-duplicate').css('display', 'none');
            } else {
                jQuery('.cell-duplicate').css('display', 'block');
            }
            var iscomponent = false;
            $block.parent().children().each(function () {
                attr = jQuery(this).attr('data-html');
                if (typeof attr !== typeof undefined && attr !== false) {
                    iscomponent = true;
                }
            });
            if (iscomponent) {
                jQuery('.row-duplicate').css('display', 'none');
            } else {
                jQuery('.row-duplicate').css('display', 'block');
            }

            //Show/Hide cell-prev & cell-next
            if ($block.parent().children().not('.is-row-tool').length == 1) {
                jQuery('.cell-prev').css('display', 'none');
                jQuery('.cell-next').css('display', 'none');
            } else {
                jQuery('.cell-prev').css('display', 'inline-block');
                jQuery('.cell-next').css('display', 'inline-block');
            }

            //Show/Hide cell-increase & cell-decrease
            if(plugin.settings.row!='' && plugin.settings.cols.length>0){

                jQuery('.cell-decrease').css('display', 'inline-block');
                jQuery('.cell-increase').css('display', 'inline-block');

            } else {
                jQuery('.cell-decrease').css('display', 'none');
                jQuery('.cell-increase').css('display', 'none');
            }
            if ($block.parent().children().not('.is-row-tool').length == 1) {//only one column, cannot be resized
                jQuery('.cell-decrease').css('display', 'none');
                jQuery('.cell-increase').css('display', 'none');
            }


            //--------- Moving ----------

            //Show/Hide cell-up
            if ($block.parent().children().length == 1) {
                if ($block.parent().prev().length == 0) {
                    jQuery('.cell-up').css('display', 'none');

                    var $currContainer = $block.parents('.is-builder').last();
                    var $prev = null;
                    jQuery('.is-builder').each(function () {
                        if (jQuery(this).html() == $currContainer.html()) {
                            if ($prev) {
                                jQuery('.cell-up').css('display', 'block');
                                return false;
                            }
                        }
                        $prev = jQuery(this);
                    });

                    if ($currContainer.parents('.is-builder').length > 0) {
                        jQuery('.cell-up').css('display', 'none'); //disable sub container moving
                    }
                } else {
                    jQuery('.cell-up').css('display', 'block');
                }
            } else {
                jQuery('.cell-up').css('display', 'block');
            }

            //Show/Hide cell-down
            if ($block.parent().children().length == 1) {
                if ($block.parent().next().length == 0) {
                    jQuery('.cell-down').css('display', 'none');

                    var $currContainer = $block.parents('.is-builder').last();
                    var flag = false;
                    jQuery('.is-builder').each(function () {
                        if (flag) {
                            jQuery('.cell-down').css('display', 'block');
                            return false;
                        }
                        if (jQuery(this).html() == $currContainer.html()) {
                            flag = true;
                        }
                    });

                    if ($currContainer.parents('.is-builder').length > 0) {
                        jQuery('.cell-down').css('display', 'none'); //disable sub container moving
                    }
                } else {
                    jQuery('.cell-down').css('display', 'block');
                }
            } else {
                jQuery('.cell-down').css('display', 'block');
            }

            //Show/Hide row-up
            if ($block.parent().prev().length == 0) {
                jQuery('.row-up').css('display', 'none');

                var $currContainer = $block.parents('.is-builder').last();
                var $prev = null;
                jQuery('.is-builder').each(function () {
                    if (jQuery(this).html() == $currContainer.html()) {
                        if ($prev) {
                            jQuery('.row-up').css('display', 'block');
                            return false;
                        }
                    }
                    $prev = jQuery(this);
                });

                if ($currContainer.parents('.is-builder').length > 0) {
                    jQuery('.row-up').css('display', 'none'); //disable sub container moving
                }
            } else {
                jQuery('.row-up').css('display', 'block');
            }

            //Show/Hide row-down
            var $blockRow = $block.parent();
            if ($blockRow.next().length == 0) {
                jQuery('.row-down').css('display', 'none');

                var $currContainer = $block.parents('.is-builder').last();
                var flag = false;
                jQuery('.is-builder').each(function () {
                    if (flag) {
                        jQuery('.row-down').css('display', 'block');
                        return false;
                    }
                    if (jQuery(this).html() == $currContainer.html()) {
                        flag = true;
                    }
                });

                if ($currContainer.parents('.is-builder').length > 0) {
                    jQuery('.row-down').css('display', 'none'); //disable sub container moving
                }
            } else {
                jQuery('.row-down').css('display', 'block');
            }

            //--------- /Moving ----------

            var _top = parseInt($block.parent().css('padding-top'));
            if(!plugin.settings.columnTool) {
                var _top = 0;
            }
            jQuery('.is-row-tool').css('top', _top);

            if (rowAction) {

                //Row Tool
                jQuery('.is-row-tool').css('display','');

                /*if(plugin.settings.rowTool) {
                    $block.parent().find('.is-row-tool').css("display", "block");
                }
                if(plugin.settings.builderMode=='minimal') {
                    $block.parent().find('.is-row-tool').css("display", "block");
                }*/

                //Show Row Tool
                $block.parent().find('.is-row-tool').css("display", "block");

                if(plugin.settings.builderMode=='clean' && jQuery('.is-modal.grideditor').hasClass('active')) {
                    $block.parent().find('.is-row-tool').css("display", "none");
                }

                $block.removeClass('cell-active'); //remove cell selection

                //select row
                jQuery('.row-active').removeClass('row-active');
                $block.parent().addClass('row-active');

                //Hide tools
                plugin.hideElementTools();
                jQuery("#divCellTool").css("display", "none");
                jQuery('#divRowAddTool').css('display', 'none');

            } else {

                //Row Tool
                jQuery('.is-row-tool').css('display','');

                //More than one .is-row-tool can be found in a block that has multiple .is-builder. Use last().
                if($block.parents('.is-builder').length>1) {
                    //do not show #divCellTool if current block is editable area inside custom module
                } else {

                    /*if(plugin.settings.rowTool) {
                        $block.parent().find('.is-row-tool').last().css("display", "block");
                    }
                    if(plugin.settings.builderMode=='minimal') {
                        $block.parent().find('.is-row-tool').last().css("display", "block");
                    }*/

                    //Show Row Tool
                    $block.parent().find('.is-row-tool').last().css("display", "block");

                    if(plugin.settings.builderMode=='clean' && jQuery('.is-modal.grideditor').hasClass('active')) {
                        $block.parent().find('.is-row-tool').last().css("display", "none");
                    }

                }

                jQuery('.row-active').removeClass('row-active');

                jQuery('.cell-active').removeClass('cell-active');
                $block.addClass('cell-active');
                if(plugin.settings.outlineMode) {
                    $block.parent().addClass('row-active');
                }

                var _toolheight = jQuery("#divCellTool").outerHeight();
                var _top = $block.offset().top - (_toolheight+6);
                var _left = $block.offset().left - 1;
                if ($block.next().length == 0) {
                    //if tool width > block width (on the last column), adjust left position.
                    if (jQuery("#divCellTool").outerWidth() > $block.outerWidth()) {
                        _left = _left - (jQuery("#divCellTool").outerWidth() - $block.outerWidth()) + 2;
                    }
                }
                jQuery("#divCellTool").css("top", _top + "px");
                jQuery("#divCellTool").css("left", _left + "px");
                if($block.parents('.is-builder').length>1) {
                    //do not show #divCellTool if current block is editable area inside custom module
                    jQuery("#divCellTool").css("display", "");
                } else {
                    //if(!jQuery('.is-modal.grideditor').hasClass('active')) jQuery("#divCellTool").css("display", "block");

                    //Show Column Tool
                    jQuery("#divCellTool").css("display", "block");
                }
                var attr = $block.attr('data-html');
                if (typeof attr !== typeof undefined && attr !== false) {
                    //Mode: plugin
                    jQuery('.cell-html').css('display', 'none');
                } else {
                    jQuery('.cell-html').css('display', '');
                }
                //$block.parent().find('.row-html').css('display', 'none'); //already set above
                $block.parent().children().not('.is-row-tool').each(function () {
                    attr = jQuery(this).attr('data-html');
                    if (typeof attr !== typeof undefined && attr !== false) {

                    } else {
                        $block.parent().find('.row-html').css('display', '');
                    }
                });
            }

            if($block.parents('[between-blocks-left],[between-blocks-center]').length>0){

                plugin.renderRowAddTool();

                jQuery("#divRowAddTool").css("display", "block");

                //default
                jQuery("#divRowAddTool button").css('top', '-10px');
                jQuery("#divRowAddTool button").css('width', '25px');
                jQuery("#divRowAddTool button").css('height', '25px');
                jQuery("#divRowAddTool button").css('left','calc(50% - 14px)');
                jQuery("#divRowAddTool button svg").css('width', '17px');
                jQuery("#divRowAddTool button svg").css('height', '17px');

                if($block.parents('[between-blocks-left]').length>0){

                    var _screenwidth = jQuery(window).width();
                    if(_screenwidth <= 1024) {
                        jQuery("#divRowAddTool button").css('left','-12px');
                    } else {
                        jQuery("#divRowAddTool button").css('left','-25px');
                    }

                }

                if($block.parents('[between-blocks-center]').length>0){

                    if(bIsAppleMobile) {
                        jQuery("#divRowAddTool button").css('top', '-13px');
                        jQuery("#divRowAddTool button").css('width', '30px');
                        jQuery("#divRowAddTool button").css('height', '30px');
                        jQuery("#divRowAddTool button").css('left','calc(50% - 16px)');
                        jQuery("#divRowAddTool button svg").css('width', '19px');
                        jQuery("#divRowAddTool button svg").css('height', '19px');

                        jQuery("#divRowAddTool button svg").css('margin-left', '-1px'); //small adjustment to look center
                    }

                }

            }

            //Position Element tool
            plugin.renderElementTool();

            if (!controlStay) {
                jQuery('.is-pop').css('display', 'none');
            }

            //Protected column should disable all tools. Check if there is data-protected attribute.
            var attr = $block.attr('data-protected');
            if (typeof attr !== typeof undefined && attr !== false) {
                this.hideElementTools();
                jQuery("#divCellTool").css("display", "none");
                jQuery(".is-row-tool").css("display", "");
                jQuery("#divRteTool").css("display", "none");
            }

            if(plugin.settings.emailMode){
                jQuery("#divCellTool").css("display", "none");
                //jQuery("#divElementTool").css("display", "none");
            }

            if(!plugin.settings.columnTool) {
                jQuery("#divCellTool").css("display", "none");
            }
            if(!plugin.settings.columnHtmlEditor) {
                jQuery('.cell-html').addClass('display-none');
            } else {
                jQuery('.cell-html').removeClass('display-none');
            }
            if (!plugin.settings.rowHtmlEditor) {
                jQuery('.row-html').addClass('display-none');
            } else {
                jQuery('.row-html').removeClass('display-none');
            }
            if (!plugin.settings.rowMoveButtons) {
                jQuery('.row-up').addClass('display-none');
                jQuery('.row-down').addClass('display-none');
            } else {
                jQuery('.row-up').removeClass('display-none');
                jQuery('.row-down').removeClass('display-none');
            }
            if(plugin.settings.builderMode=='minimal' || plugin.settings.builderMode=='clean') {
                jQuery("#divCellTool").css("display", "none");
            }
        };

        plugin.hideElementTools = function (bDoNotHideImgResizer) {
            jQuery('#divSpacerTool').css("display", "none");
            jQuery('#divImageTool').css("display", "none");
            jQuery('#divIframeTool').css("display", "none");
            jQuery('#divCustomCodeTool').css("display", "none");
            jQuery('#divCustomModuleTool').css("display", "none");
            jQuery('#divLinkTool').css("display", "none");
            jQuery('#divIconTool').css("display", "none");
            jQuery('#divTableTool').css("display", "none");
            jQuery('#divElementTool').css("display", "none");
            jQuery('.is-plugin-tool').css('display', 'none');
            if(bDoNotHideImgResizer){

            } else {
                jQuery("#divImgResizer").css("display", "none");
            }

            jQuery('.is-pop').css('display', 'none');
        };

        plugin.hideModal = function ($modal) {
            $modal.children('.is-modal-overlay').remove();
            $modal.removeClass('active');

            //if(jQuery('.is-modal.active').not('.is-side').length>0) return; //commented because is-side panel has no css transform

            if (jQuery('body').hasClass('full-edit')) {
                jQuery('.mobile-edit').css('transform', ''); //MOBILE FULL-EDIT
            } else {
                if (jQuery(plugin.settings.page).length == 1) {
                    jQuery(plugin.settings.page).css('transform', '');
                } else {
                    jQuery(plugin.settings.container).css('transform', '');
                }
            }
            //jQuery('body').removeClass('modal-active');
        };

        plugin.showModal = function ($modal, overlayStay, controlStay, cancelCallback, animated) {
            $modal.addClass('active');
            var animate = false;
            if(animated=== undefined){
                animate=plugin.settings.animateModal;
            } else {
                animate=animated;
            }
            if(animate) {
                if (jQuery('body').hasClass('full-edit')) {
                    jQuery('.mobile-edit').css('transform', 'scale(0.98)'); //MOBILE FULL-EDIT
                } else {
                    if (jQuery(plugin.settings.page).length == 1) {
                        jQuery(plugin.settings.page).css('transform', 'scale(0.98)');
                    } else {
                        jQuery(plugin.settings.container).css('transform', 'scale(0.98)');
                    }
                }
                //jQuery('body').addClass('modal-active');
            }

            //Hide elements
            plugin.hideElementTools();
            jQuery('#divRteTool').css('display', 'none');
            jQuery('#divCellTool').css('display', 'none');
            jQuery('#divRowAddTool').css('display', 'none');
            jQuery(".is-row-tool").css("display", "");
            //jQuery('.row-active').removeClass('row-active');
            if (!controlStay) {
                jQuery('.row-active').removeClass('row-active');
                jQuery('.row-outline').removeClass('row-outline');
                jQuery('.cell-active').removeClass('cell-active');
            }

            if(overlayStay){
                $modal.prepend('<div class="is-modal-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.3);z-index:-1;"></div>');
            } else {
                $modal.prepend('<div class="is-modal-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.000001);z-index:-1;"></div>');
            }

            if(overlayStay){

                $modal.find('.input-cancel').off('click');
                $modal.find('.input-cancel').on('click', function (e) {

                    $modal.children('.is-modal-overlay').remove();

                    if (cancelCallback) cancelCallback();

                    if (!controlStay) {
                        jQuery('.cell-active').removeClass('cell-active');
                        jQuery('.row-active').removeClass('row-active');
                        jQuery('.row-outline').removeClass('row-outline');
                    }

                    plugin.hideModal($modal);
                });

            } else {

                $modal.find('.is-modal-overlay').off('click');
                $modal.find('.is-modal-overlay').on('click', function (e) {

                    $modal.children('.is-modal-overlay').remove();

                    if (cancelCallback) cancelCallback();

                    if (!controlStay) {
                        jQuery('.cell-active').removeClass('cell-active');
                        jQuery('.row-active').removeClass('row-active');
                        jQuery('.row-outline').removeClass('row-outline');
                    }

                    plugin.hideModal($modal);
                });
            }
        };

        plugin.hideSidePanel = function ($modal) {
            jQuery('.is-side').removeClass('active');
            jQuery('.elm-inspected').removeClass('elm-inspected'); //in case previously opened is elementstyles
            jQuery('body').removeClass('body-fullview');
            jQuery('body').removeClass('body-fullview-left');
            jQuery('[data-saveforundo]').removeAttr('data-saveforundo');
        };

        plugin.showSidePanel = function ($modal, bodyslide) {
            jQuery('.is-side').removeClass('active');
            jQuery('.elm-inspected').removeClass('elm-inspected'); //in case previously opened is elementstyles
            $modal.addClass('active');

            //Hide elements
            jQuery('.is-pop').css('display', 'none');

            if(bodyslide) {
                if($modal.hasClass('fromleft')){
                    jQuery('body').addClass('body-fullview-left');
                } else {
                    jQuery('body').addClass('body-fullview');
                }
            }

            //Additional
            jQuery(".is-modal.grideditor").css("display", "none");
        };

        // USEFUL METHODS


        plugin.getScriptPath = function () {
            return scriptPath;
        };


        // CONTENT RELATED METHODS

        plugin.viewSnippets = function (opensidebar) {

            if(opensidebar && bSideSnippets){

                var $modal = jQuery('.is-side.snippetlist');
                $modal.addClass('active');

                if(plugin.settings.snippetPageSliding && !bIsAppleMobile){
                    if($modal.hasClass('fromleft')){
                        jQuery('body').addClass('body-fullview-left');
                    } else {
                        jQuery('body').addClass('body-fullview');
                    }
                }
                if(plugin.settings.sidePanel=='right'){
                    jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-right"></use></svg>');
                } else {
                    jQuery('#divSnippetHandle').html('<svg class="is-icon-flex" style="width:17px;height:17px;fill:rgba(0, 0, 0, 0.75);"><use xlink:href="#ion-ios-arrow-left"></use></svg>');
                }

                //Hide elements
                plugin.hideElementTools();
                jQuery('#divRteTool').css('display', 'none');
                jQuery('#divCellTool').css('display', 'none');
                jQuery('#divRowAddTool').css('display', 'none');
                jQuery(".is-row-tool").css("display", "");
                jQuery('.row-active').removeClass('row-active');
                jQuery('.row-outline').removeClass('row-outline');
                jQuery('.cell-active').removeClass('cell-active');

                /*if(event){
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }*/

            } else {

                jQuery(".cell-add-options").data('mode', 'lastrow'); //Add to the last row

                plugin.hideElementTools();

                var $modal = jQuery('.is-modal.snippets');
                $modal.addClass('active');

                if ($modal.find('iframe').attr('src') == 'about:blank') {
                    $modal.find('iframe').attr('src', plugin.settings.snippetData);
                }

                $modal.not('.is-modal *').off('click');
                $modal.not('.is-modal *').on('click', function (e) {
                    if (jQuery(e.target).hasClass('is-modal')) {

                        $modal.removeClass('active');
                    }
                });

            }
        };

        plugin.loadHtml = function (html) {

            $wrapper.html(html);

            plugin.applyBehavior();

            //Trigger Render event
            plugin.settings.onRender();
        };

        plugin.loadHTML = function (html) { //backward compatibility

            plugin.loadHtml(html);

        };

        plugin.viewConfig = function () {

            //show modal
            var $modal = jQuery('.is-modal.viewconfig');
            plugin.showModal($modal);

            //get values
            if(plugin.settings.elementTool ){
                $modal.find('.input-hideelementtool').prop("checked", false);
            } else {
                $modal.find('.input-hideelementtool').prop("checked", true);
            }
            if(plugin.settings.columnTool ){
                $modal.find('.input-hidecelltool').prop("checked", false);
            } else {
                $modal.find('.input-hidecelltool').prop("checked", true);
            }
            /*if(plugin.settings.rowTool ){
                $modal.find('.input-hiderowtool').prop("checked", false);
            } else {
                $modal.find('.input-hiderowtool').prop("checked", true);
            }*/
            if(plugin.settings.rowcolOutline ){
                $modal.find('.input-hiderowcoloutline').prop("checked", false);
            } else {
                $modal.find('.input-hiderowcoloutline').prop("checked", true);
            }
            if(plugin.settings.dragWithoutHandle ){
                $modal.find('.input-dragwithouthandle').prop("checked", true);
            } else {
                $modal.find('.input-dragwithouthandle').prop("checked", false);
            }
            if(plugin.settings.animatedSorting ){
                $modal.find('.input-animatedsorting').prop("checked", true);
            } else {
                $modal.find('.input-animatedsorting').prop("checked", false);
            }
            if(plugin.settings.columnHtmlEditor ){
                $modal.find('.input-hidecolhtmleditor').prop("checked", false);
            } else {
                $modal.find('.input-hidecolhtmleditor').prop("checked", true);
            }
            if(plugin.settings.rowHtmlEditor ){
                $modal.find('.input-hiderowhtmleditor').prop("checked", false);
            } else {
                $modal.find('.input-hiderowhtmleditor').prop("checked", true);
            }
            if(plugin.settings.snippetOpen ){
                $modal.find('.input-opensnippets').prop("checked", true);
            } else {
                $modal.find('.input-opensnippets').prop("checked", false);
            }
            if(plugin.settings.rowMoveButtons ){
                $modal.find('.input-hiderowmovebuttons').prop("checked", false);
            } else {
                $modal.find('.input-hiderowmovebuttons').prop("checked", true);
            }
            if(plugin.settings.htmlSyntaxHighlighting ){
                $modal.find('.input-advancedhtmleditor').prop("checked", true);
            } else {
                $modal.find('.input-advancedhtmleditor').prop("checked", false);
            }
            if(plugin.settings.scrollableEditingToolbar ){
                $modal.find('.input-scrollableeditor').prop("checked", true);
            } else {
                $modal.find('.input-scrollableeditor').prop("checked", false);
            }
            if(plugin.settings.elementHighlight ){
                $modal.find('.input-hideelementhighlight').prop("checked", false);
            } else {
                $modal.find('.input-hideelementhighlight').prop("checked", true);
            }

            try {
                jQuery('.select-buildermode').val(plugin.settings.builderMode);
                jQuery('.select-editingtoolbar').val(plugin.settings.toolbar);
                jQuery('.select-editingtoolbardisplay').val(plugin.settings.toolbarDisplay);
                jQuery('.select-pasteresult').val(plugin.settings.paste);
                jQuery('.select-addbuttonplace').val(plugin.settings.addButtonPlacement);
                jQuery('.select-outlinemode').val(plugin.settings.outlineMode);
                jQuery('.select-rowtool').val(plugin.settings.rowTool);
            } catch(e) {}

            if(jQuery('.select-buildermode').val()=='minimal' || jQuery('.select-buildermode').val()=='clean') {
                //$modal.find('.input-hiderowtool').prop("checked",false); //do not hide row tool on minimal mode. Also uneeded in clean mode.
                //$modal.find('.input-hiderowtool').attr('disabled','');

                $modal.find('.input-hiderowhtmleditor,.input-hiderowmovebuttons,.input-hidecelltool,.input-hidecolhtmleditor').attr('disabled','');

                $modal.find('.input-hiderowcoloutline').removeAttr('disabled');

            } else if(jQuery('.select-buildermode').val()=='') {

                //$modal.find('.input-hiderowtool').prop("checked",false); //do not hide row tool on default mode
                //$modal.find('.input-hiderowtool').attr('disabled','');

                $modal.find('.input-hiderowhtmleditor,.input-hiderowmovebuttons,.input-hidecelltool,.input-hidecolhtmleditor').removeAttr('disabled');

                $modal.find('.input-hiderowcoloutline').prop("checked",false); //do not hide outline on default mode
                $modal.find('.input-hiderowcoloutline').attr('disabled','');
            }

            var previous;
            jQuery(".select-buildermode").off('focus');
            jQuery(".select-buildermode").off('change');
            jQuery(".select-buildermode").on('focus', function () {
                previous = jQuery(this).val();
            });
            jQuery('.select-buildermode').on('change', function(){
                if(jQuery(this).val()=='minimal' || jQuery(this).val()=='clean') {
                    //$modal.find('.input-hiderowtool').prop("checked",false); //do not hide row tool on minimal mode. Also uneeded in clean mode.
                    //$modal.find('.input-hiderowtool').attr('disabled','');

                    $modal.find('.input-hiderowhtmleditor,.input-hiderowmovebuttons,.input-hidecelltool,.input-hidecolhtmleditor').attr('disabled','');//disable uneeded options

                    if(jQuery(this).val()=='clean') {

                        $modal.find('.input-hiderowcoloutline').prop("checked",true); //recommended

                    } else {

                        if(previous=='clean') {
                            $modal.find('.input-hiderowcoloutline').prop("checked",false); //recommended
                        }
                    }
                    $modal.find('.input-hiderowcoloutline').removeAttr('disabled');

                } else if(jQuery(this).val()=='') {
                    //$modal.find('.input-hiderowtool').prop("checked",false); //do not hide row tool on default mode
                    //$modal.find('.input-hiderowtool').attr('disabled','');

                    $modal.find('.input-hiderowhtmleditor,.input-hiderowmovebuttons,.input-hidecelltool,.input-hidecolhtmleditor').removeAttr('disabled');//enable others

                    $modal.find('.input-hiderowcoloutline').prop("checked",false); //do not hide outline on default mode
                    $modal.find('.input-hiderowcoloutline').attr('disabled','');
                }

                previous = this.value;
            });

            $modal.find('.input-cancel').off('click');
            $modal.find('.input-cancel').on('click', function (e) {

                plugin.hideModal($modal);

            });

            $modal.find('.input-ok').off('click');
            $modal.find('.input-ok').on('click', function (e) {
                if($modal.find('.input-hideelementtool').prop("checked")){
                    plugin.settings.elementTool = false;
                    localStorage.setItem("_hideelementtool", '1');
                } else {
                    plugin.settings.elementTool = true;
                    localStorage.setItem("_hideelementtool", '0');
                }
                if($modal.find('.input-hidecelltool').prop("checked")){
                    plugin.settings.columnTool = false;
                    localStorage.setItem("_hidecelltool", '1');
                } else {
                    plugin.settings.columnTool = true;
                    localStorage.setItem("_hidecelltool", '0');
                }
                /*if($modal.find('.input-hiderowtool').prop("checked")){
                    plugin.settings.rowTool = false;
                    localStorage.setItem("_hiderowtool", '1');
                } else {
                    plugin.settings.rowTool = true;
                    localStorage.setItem("_hiderowtool", '0');
                }*/
                if($modal.find('.input-hiderowcoloutline').prop("checked")){
                    plugin.settings.rowcolOutline = false;
                    localStorage.setItem("_hiderowcoloutline", '1');
                    jQuery('.is-builder').attr('hideoutline','');
                } else {
                    plugin.settings.rowcolOutline = true;
                    localStorage.setItem("_hiderowcoloutline", '0');
                    jQuery('.is-builder').removeAttr('hideoutline');
                }
                if($modal.find('.input-dragwithouthandle').prop("checked")){
                    plugin.settings.dragWithoutHandle = true;
                    localStorage.setItem("_dragwithouthandle", '1');
                    jQuery('.is-builder').attr('dragwithouthandle','');
                } else {
                    plugin.settings.dragWithoutHandle = false;
                    localStorage.setItem("_dragwithouthandle", '0');
                    jQuery('.is-builder').removeAttr('dragwithouthandle');
                }
                if($modal.find('.input-animatedsorting').prop("checked")){
                    plugin.settings.animatedSorting = true;
                    localStorage.setItem("_animatedsorting", '1');
                } else {
                    plugin.settings.animatedSorting = false;
                    localStorage.setItem("_animatedsorting", '0');
                }
                if($modal.find('.input-hidecolhtmleditor').prop("checked")){
                    plugin.settings.columnHtmlEditor = false;
                    localStorage.setItem("_hidecolhtmleditor", '1');
                } else {
                    plugin.settings.columnHtmlEditor = true;
                    localStorage.setItem("_hidecolhtmleditor", '0');
                }
                if($modal.find('.input-hiderowhtmleditor').prop("checked")){
                    plugin.settings.rowHtmlEditor = false;
                    localStorage.setItem("_hiderowhtmleditor", '1');
                } else {
                    plugin.settings.rowHtmlEditor = true;
                    localStorage.setItem("_hiderowhtmleditor", '0');
                }
                if($modal.find('.input-hiderowmovebuttons').prop("checked")){
                    plugin.settings.rowMoveButtons = false;
                    localStorage.setItem("_hiderowmovebuttons", '1');
                } else {
                    plugin.settings.rowMoveButtons = true;
                    localStorage.setItem("_hiderowmovebuttons", '0');
                }
                if($modal.find('.input-opensnippets').prop("checked")){
                    plugin.settings.snippetOpen = true;
                    localStorage.setItem("_opensnippets", '1');
                } else {
                    plugin.settings.snippetOpen = false;
                    localStorage.setItem("_opensnippets", '0');
                }
                if($modal.find('.input-advancedhtmleditor').prop("checked")){
                    plugin.settings.htmlSyntaxHighlighting = true;
                    localStorage.setItem("_advancedhtmleditor", '1');
                } else {
                    plugin.settings.htmlSyntaxHighlighting = false;
                    localStorage.setItem("_advancedhtmleditor", '0');
                }
                if($modal.find('.input-scrollableeditor').prop("checked")){
                    plugin.settings.scrollableEditingToolbar = true;
                    localStorage.setItem("_scrollableeditor", '1');
                } else {
                    plugin.settings.scrollableEditingToolbar = false;
                    localStorage.setItem("_scrollableeditor", '0');
                }
                if($modal.find('.input-hideelementhighlight').prop("checked")){
                    plugin.settings.elementHighlight = false;
                    localStorage.setItem("_hideelementhighlight", '1');
                    jQuery('.is-builder').attr('hideelementhighlight','');
                } else {
                    plugin.settings.elementHighlight = true;
                    localStorage.setItem("_hideelementhighlight", '0');
                    jQuery('.is-builder').removeAttr('hideelementhighlight');
                }

                plugin.settings.builderMode = jQuery('.select-buildermode').val();
                localStorage.setItem("_buildermode", jQuery('.select-buildermode').val());

                plugin.settings.toolbar = jQuery('.select-editingtoolbar').val();
                localStorage.setItem("_editingtoolbar", jQuery('.select-editingtoolbar').val());

                plugin.settings.toolbarDisplay = jQuery('.select-editingtoolbardisplay').val();
                localStorage.setItem("_editingtoolbardisplay", jQuery('.select-editingtoolbardisplay').val());

                plugin.settings.paste = jQuery('.select-pasteresult').val();
                localStorage.setItem("_pasteresult", jQuery('.select-pasteresult').val());

                plugin.settings.addButtonPlacement = jQuery('.select-addbuttonplace').val();
                localStorage.setItem("_addbuttonplace", jQuery('.select-addbuttonplace').val());

                plugin.settings.outlineMode = jQuery('.select-outlinemode').val();
                localStorage.setItem("_outlinemode", jQuery('.select-outlinemode').val());

                plugin.settings.rowTool = jQuery('.select-rowtool').val();
                localStorage.setItem("_rowtool", jQuery('.select-rowtool').val());

                plugin.refreshToolbar();

                plugin.positionToolbar();

                plugin.hideModal($modal);

                plugin.applyBehavior(); //needed to re-init sortable

            });

        };

        plugin.viewRowHtml = function () {

            var $block = jQuery('#divCellTool').data('active');
            if(!$block) return;

            //change to row selection
            jQuery('.cell-active').removeClass('cell-active');
            jQuery('.row-active').removeClass('row-active');
            $block.parent().addClass('row-active');

            if(plugin.settings.htmlSyntaxHighlighting) {

                //prepare modal
                var $modal = jQuery('.is-modal.viewhtmlformatted');

                //get values
                var html = plugin.readHtml($block.parent(), true); //for view=true
                //var html = plugin.readHtmlBlock($block);
                $modal.find('textarea').val(html);

                //used  by larger editor dialog (html.html)
                jQuery('textarea').removeAttr('data-source-active');
                jQuery('textarea').removeAttr('data-source-ok');
                jQuery('textarea').removeAttr('data-source-cancel');
                $modal.find('textarea').attr('data-source-active','1');
                $modal.find('textarea').attr('data-source-ok','.viewhtmlformatted .input-ok');
                $modal.find('textarea').attr('data-source-cancel','.viewhtmlformatted .input-cancel');

                //show modal
                $modal.addClass('active');
                $modal.addClass('is-modal-small');
                $modal.removeClass('is-modal-full');
                plugin.showModal($modal, true, true);

                $modal.find('#ifrHtmlFormatted').attr('src', scriptPath+'html_small.html?1');

                $modal.find('.input-cancel').off('click');
                $modal.find('.input-cancel').on('click', function (e) {

                    $modal.removeClass('is-modal-small');
                    plugin.hideModal($modal);

                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var html = $modal.find('textarea').val();
                    html = plugin.fromViewToActual(html);

                    var $block = jQuery('#divCellTool').data('active');
                    $block.parent().html(html);

                    plugin.applyBehavior();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    $modal.removeClass('is-modal-small');
                    plugin.hideModal($modal);

                });

                //Open Larger Editor
                jQuery('.viewhtmlformatted .cell-html-larger').off('click');
                jQuery('.viewhtmlformatted .cell-html-larger').on('click', function (e) {

                    //show modal
                    var $modal = jQuery('.is-modal.viewhtmlformatted');
                    if($modal.hasClass('is-modal-small')) {
                        $modal.removeClass('is-modal-small');
                        $modal.addClass('is-modal-full');
                    } else {
                        $modal.addClass('is-modal-small');
                        $modal.removeClass('is-modal-full');
                    }
                });

            } else {


                //show modal
                var $modal = jQuery('.is-modal.viewhtml');
                $modal.addClass('is-modal-small');
                plugin.showModal($modal, true, true);

                //get values
                var html = plugin.readHtml($block.parent(), true); //for view=true
                //var html = plugin.readHtmlBlock($block);
                $modal.find('textarea').val(html);

                $modal.find('.cell-html-cancel').off('click');
                $modal.find('.cell-html-cancel').on('click', function (e) {

                    $modal.removeClass('is-modal-small');
                    plugin.hideModal($modal);

                });

                $modal.find('.cell-html-ok').off('click');
                $modal.find('.cell-html-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var html = $modal.find('textarea').val();
                    html = plugin.fromViewToActual(html);

                    var $block = jQuery('#divCellTool').data('active');
                    $block.parent().html(html);

                    plugin.applyBehavior();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    $modal.removeClass('is-modal-small');
                    plugin.hideModal($modal);

                });

                //Open Larger Editor
                jQuery('.viewhtml .cell-html-larger').off('click');
                jQuery('.viewhtml .cell-html-larger').on('click', function (e) {

                    //used  by larger editor dialog (html.html)
                    jQuery('textarea').removeAttr('data-source-active');
                    jQuery('textarea').removeAttr('data-source-ok');
                    jQuery('textarea').removeAttr('data-source-cancel');
                    jQuery('.viewhtml textarea').attr('data-source-active','1');
                    jQuery('.viewhtml textarea').attr('data-source-ok','.viewhtml .cell-html-ok');
                    jQuery('.viewhtml textarea').attr('data-source-cancel','.viewhtml .cell-html-cancel');

                    //show modal
                    var $modal = jQuery('.is-modal.viewhtmllarger');
                    $modal.addClass('active');
                    plugin.showModal($modal);

                    $modal.find('#ifrHtml').attr('src', scriptPath+'html.html?1');
                });

            }
        };

        plugin.viewHtml = function () {

            if(plugin.settings.htmlSyntaxHighlighting) {

                //prepare modal
                var $modal = jQuery('.is-modal.viewhtmlformatted');

                //get values
                var html = plugin.readHtml($wrapper, true); //for view=true
                $modal.find('textarea').val(html);

                //used  by larger editor dialog (html.html)
                jQuery('textarea').removeAttr('data-source-active');
                jQuery('textarea').removeAttr('data-source-ok');
                jQuery('textarea').removeAttr('data-source-cancel');
                $modal.find('textarea').attr('data-source-active','1');
                $modal.find('textarea').attr('data-source-ok','.viewhtmlformatted .input-ok');
                $modal.find('textarea').attr('data-source-cancel','.viewhtmlformatted .input-cancel');

                //show modal
                $modal.addClass('active');
                $modal.removeClass('is-modal-full');
                plugin.showModal($modal, true);

                $modal.find('#ifrHtmlFormatted').attr('src', scriptPath+'html_small.html?1');

                $modal.find('.input-cancel').off('click');
                $modal.find('.input-cancel').on('click', function (e) {

                    plugin.hideModal($modal);

                });

                $modal.find('.input-ok').off('click');
                $modal.find('.input-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var html = $modal.find('textarea').val();
                    html = plugin.fromViewToActual(html);

                    $wrapper.html(html);

                    plugin.applyBehavior();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    plugin.hideModal($modal);

                });

                //Open Larger Editor
                jQuery('.viewhtmlformatted .cell-html-larger').off('click');
                jQuery('.viewhtmlformatted .cell-html-larger').on('click', function (e) {

                    //show modal
                    var $modal = jQuery('.is-modal.viewhtmlformatted');
                    if($modal.hasClass('is-modal-full')) {
                        $modal.removeClass('is-modal-full');
                    } else {
                        $modal.addClass('is-modal-full');
                    }
                });

            } else {

                //show modal
                var $modal = jQuery('.is-modal.viewhtml');
                plugin.showModal($modal, true);

                //get values
                var html = plugin.readHtml($wrapper, true); //for view=true
                $modal.find('textarea').val(html);

                $modal.find('.cell-html-cancel').off('click');
                $modal.find('.cell-html-cancel').on('click', function (e) {

                    plugin.hideModal($modal);

                });

                $modal.find('.cell-html-ok').off('click');
                $modal.find('.cell-html-ok').on('click', function (e) {

                    //Save for Undo
                    plugin.saveForUndo();

                    var html = $modal.find('textarea').val();
                    html = plugin.fromViewToActual(html);

                    $wrapper.html(html);

                    plugin.applyBehavior();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                    plugin.hideModal($modal);
                });

                //Open Larger Editor
                jQuery('.viewhtml .cell-html-larger').off('click');
                jQuery('.viewhtml .cell-html-larger').on('click', function (e) {

                    //used  by larger editor dialog (html.html)
                    jQuery('textarea').removeAttr('data-source-active');
                    jQuery('textarea').removeAttr('data-source-ok');
                    jQuery('textarea').removeAttr('data-source-cancel');
                    jQuery('.viewhtml textarea').attr('data-source-active','1');
                    jQuery('.viewhtml textarea').attr('data-source-ok','.viewhtml .cell-html-ok');
                    jQuery('.viewhtml textarea').attr('data-source-cancel','.viewhtml .cell-html-cancel');

                    //show modal
                    var $modal = jQuery('.is-modal.viewhtmllarger');
                    $modal.addClass('active');
                    plugin.showModal($modal);

                    $modal.find('#ifrHtml').attr('src', scriptPath+'html.html?1');
                });

            }

        };

        plugin.html = function ($area) {

            //Make absolute
            if(this.settings.absolutePath) {
                $wrapper.find('a').each(function () {
                    var href = jQuery(this).get(0).href;
                    jQuery(this).attr('href',href);
                });
                $wrapper.find('img').each(function () {
                    var href = jQuery(this).get(0).src;
                    jQuery(this).attr('src',href);
                });
            }

            if($area===undefined){
                var html = plugin.readHtml($wrapper); //for view=false
            } else {
                var html = plugin.readHtml($area); //for view=false
            }

            return html;

        };

        /* ------------------- Helpers (read/render html) --------------------- */

        var hash = {};

        plugin.fromViewToActual = function (html){
            for (var key in hash) {
                html = html.replace(key, hash[key]);
            }
            return html;
        };

        plugin.readHtml = function ($content, view, multiple) {//view = true (hide internal attributes). view = false (actual html)

            //Prepare temporary helpers: #tmp_content & #tmp_buildercontent
            jQuery('#tmp_content').remove();
            jQuery('#tmp_buildercontent').remove();
            jQuery('body').append('<div id="tmp_content" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>' +
                '<div id="tmp_buildercontent" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>');
            var $tmp = jQuery('#tmp_content');
            $tmp.html($content.html());

            //Find editable areas (is-builder) in custom code blocks and save them to data-html-1, data-html-2, and so on.
            $tmp.find("[data-html]").each(function () {
                var $block = jQuery(this);

                var index = 1;
                $block.find('.is-builder').each(function () {
                    var builderhtml = jQuery(this).html();

                    if(jQuery(this).parents('.slick-cloned').length>0)return;

                    //Cleaning
                    jQuery(this).css('transform','');
                    jQuery(this).removeClass('ui-sortable');
                    jQuery(this).removeClass('connectSortable');

                    jQuery(this).removeAttr('hideoutline');
                    jQuery(this).removeAttr('gridoutline');
                    jQuery(this).removeAttr('draggridoutline');
                    jQuery(this).removeAttr('minimal');
                    jQuery(this).removeAttr('clean');
                    jQuery(this).removeAttr('between-blocks-left');
                    jQuery(this).removeAttr('between-blocks-center');
                    jQuery(this).removeAttr('hideelementhighlight');

                    var $builder = jQuery('#tmp_buildercontent');
                    $builder.html(builderhtml);
                    $builder.find('.elm-active').removeClass('elm-active');
                    $builder.find('.elm-inspected').removeClass('elm-inspected');
                    $builder.find('.cell-active').removeClass('cell-active');
                    $builder.find('.row-active').removeClass('row-active');
                    $builder.find('.row-outline').removeClass('row-outline');
                    //$builder.find('.is-builder').removeClass('is-builder');
                    $builder.find('[contenteditable]').removeAttr('contenteditable');
                    $builder.find("[data-module-active]").removeAttr('data-module-active');
                    $builder.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
                    $builder.find('.ui-sortable-placeholder').remove();
                    $builder.find('.marker').remove();
                    $builder.find('.cloned-handler').remove();
                    $builder.children('div').css('transform','');
                    $builder.find('.is-row-tool').remove();
                    $builder.find('.ovl').remove();
                    $builder.find('.row-add-initial').remove();
                    $builder.find('*[class=""]').removeAttr('class');
                    $builder.find('*[style=""]').removeAttr('style');
                    $builder.find('[data-keep]').removeAttr('data-keep');

                    var builderhtml = $builder.html().trim();
                    builderhtml = builderhtml.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

                    $block.attr('data-html-' + index, encodeURIComponent(builderhtml));
                    index++;
                });
            });

            //Render custom code blocks (including any editable areas within)
            $tmp.find("[data-html]").each(function () {
                var $block = jQuery(this);

                var blockhtml = decodeURIComponent($block.attr('data-html'));
                blockhtml = blockhtml.replace(/{id}/g, makeid());
                for(var i=1;i<=20;i++){
                    blockhtml = blockhtml.replace('[%HTML'+i+'%]', ($block.attr('data-html-'+i) === undefined ? '' : decodeURIComponent($block.attr('data-html-'+i))));//render editable area
                }
                $block.html(blockhtml); //embedded script is not (and should not) executed here
            });

            //For Viewing, hide data-html, data-html-1.., data-settings
            if(view){
                hash = {};
                $tmp.find("[data-html]").each(function () {
                    var $block = jQuery(this);

                    var uniqueID = makeid();
                    hash[uniqueID] = $block.attr('data-html');
                    $block.attr('data-html', uniqueID);

                    for(var i=1;i<=20;i++){
                        if($block.attr('data-html-'+i) === undefined){

                        } else {
                            var uniqueID = makeid();
                            hash[uniqueID] = $block.attr('data-html-'+i);
                            $block.attr('data-html-'+i, uniqueID);
                        }
                    }

                    if($block.attr('data-settings') === undefined){

                    } else {
                        var uniqueID = makeid();
                        hash[uniqueID] = $block.attr('data-settings');
                        $block.attr('data-settings', uniqueID);
                    }
                });
            } else {
                //console.log('for view: false')
            }

            //Cleaning
            $tmp.find('.elm-active').removeClass('elm-active');
            $tmp.find('.elm-inspected').removeClass('elm-inspected');
            $tmp.find('.cell-active').removeClass('cell-active');
            $tmp.find('.row-active').removeClass('row-active');
            $tmp.find('.row-outline').removeClass('row-outline');
            //$tmp.find('.is-builder').removeClass('is-builder');
            $tmp.find('[contenteditable]').removeAttr('contenteditable');
            $tmp.find('[hideoutline]').removeAttr('hideoutline');
            $tmp.find('[gridoutline]').removeAttr('gridoutline');
            $tmp.find('[draggridoutline]').removeAttr('draggridoutline');
            $tmp.find('[between-blocks-left]').removeAttr('between-blocks-left');
            $tmp.find('[between-blocks-center]').removeAttr('between-blocks-center');
            $tmp.find('[hideelementhighlight]').removeAttr('hideelementhighlight');
            $tmp.find('[minimal]').removeAttr('minimal');
            $tmp.find('[clean]').removeAttr('clean');
            $tmp.find("[data-module-active]").removeAttr('data-module-active');
            $tmp.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
            $tmp.find('.ui-sortable-placeholder').remove();
            $tmp.find('.marker').remove();
            $tmp.find('.cloned-handler').remove();
            $tmp.find('.is-builder > div').css('transform','');
            $tmp.find('.connectSortable').removeClass('connectSortable');
            $tmp.find('.is-row-tool').remove();
            $tmp.find('.ovl').remove();
            $tmp.find('.row-add-initial').remove();
            //Extra cleaning
            $tmp.find('.aos-init').removeClass('aos-init');
            $tmp.find('.aos-animate').removeClass('aos-animate');
            $tmp.find('.skrollable').removeClass('skrollable');
            $tmp.find('.skrollable-after').removeClass('skrollable-after');
            $tmp.find('.skrollable-before').removeClass('skrollable-before');
            $tmp.find('.skrollable-between').removeClass('skrollable-between');
            //Final cleaning
            $tmp.find('*[class=""]').removeAttr('class');
            $tmp.find('*[style=""]').removeAttr('style');
            $tmp.find('[data-keep]').removeAttr('data-keep');
            //Cleanup button <span contenteditable="false"><a contenteditable="true">button</a></span>
            $tmp.find('a').each(function(){
                if (jQuery(this).css('display') == 'inline-block') {
                    //link button
                    if(jQuery(this).parent().children('a').length ==1 && jQuery(this).parent().prop("tagName").toLowerCase() =='span'){
                        jQuery(this).parent().replaceWith(jQuery(this).parent().html());
                    }
                }
            });

            var html = '';
            if(multiple){

                //ContentBox
                //Remove dummy DIV after last section
                $tmp.children('div.is-dummy').remove();
                //Cleanup Animation Things
                $tmp.find('.is-animated').each(function () {

                    jQuery(this).removeClass('animated');
                    jQuery(this).removeClass('pulse');
                    jQuery(this).removeClass('bounceIn');
                    jQuery(this).removeClass('fadeIn');
                    jQuery(this).removeClass('fadeInDown');
                    jQuery(this).removeClass('fadeInLeft');
                    jQuery(this).removeClass('fadeInRight');
                    jQuery(this).removeClass('fadeInUp');
                    jQuery(this).removeClass('flipInX');
                    jQuery(this).removeClass('flipInY');
                    jQuery(this).removeClass('slideInUp');
                    jQuery(this).removeClass('slideInDown');
                    jQuery(this).removeClass('slideInLeft');
                    jQuery(this).removeClass('slideInRight');
                    jQuery(this).removeClass('zoomIn');

                    jQuery(this).css('animation-delay', '');
                });
                //Cleanup utils
                $tmp.find(".is-appeared").removeClass("is-appeared");
                $tmp.find(".box-active").removeClass("box-active");
                $tmp.find(".section-active").removeClass("section-active");
                $tmp.find('.is-section-tool').remove();

                var html_content = '';
                var html_footer = '';
                var html_others = '';
                $tmp.children().each(function () {

                    var $currentSection = jQuery(this);

                    if ($currentSection.hasClass('is-section')) {

                        var secclass = ''; var secstyle = '';
                        if ($currentSection.attr('class')) secclass = ' class="' + $currentSection.attr('class') + '"';
                        if ($currentSection.attr('style')) secstyle = ' style="' + $currentSection.attr('style') + '"';

                        var $copySection = $currentSection.clone();

                        /*
                        var $s = $copySection.html();

                        $s = $s.replace(/&quot;/g, '\'');
                        //$s = $s.replace(/style=\'/g, 'style="');
                        //$s = $s.replace(/url\("/g, 'url(\'').replace(/"\);\'/g, '\'\);"'); // Fix incorrect quotes in IE: style='background-image: url("...");'


                        html += '<div' + secclass + secstyle + '>' + $s + '</div>\n\n';

                        //content & footer
                        if (secclass.indexOf('is-static') == -1) {
                            html_content += '<div' + secclass + secstyle + '>' + $s + '</div>\n\n';
                        } else {
                            html_footer += '<div' + secclass + secstyle + '>' + $s + '</div>\n\n';
                        }
                        */

                        var htmlSection = $copySection[0].outerHTML; //jQuery("<div />").append($copySection).html();

                        html += htmlSection;

                        //content & footer
                        if (secclass.indexOf('is-static') == -1) {
                            html_content += htmlSection + '\n\n';
                        } else {
                            html_footer += htmlSection + '\n\n';
                        }

                    } else {

                        var $copySection = $currentSection.clone();

                        var htmlSection = $copySection[0].outerHTML;

                        html += htmlSection;

                        //others
                        html_others += htmlSection;
                    }

                });

                if (html_footer != '') html_footer = '<!---FOOTER--->\n' + html_footer;
                if (html_others != '') html_others = '<!---OTHERS--->\n' + html_others;

                var disableStaticSection = $content.data("contentbox").settings.disableStaticSection;
                if (!disableStaticSection) {
                    html = html_content + html_footer + html_others;
                }

            } else {

                html = $tmp.html().trim();
                html = html.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

            }

            jQuery('#tmp_content').remove();
            jQuery('#tmp_buildercontent').remove();

            return html;
        };

        plugin.readHtmlBlock = function ($block) {

            jQuery('#tmp_content').remove();
            jQuery('body').append('<div id="tmp_content" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>');
            var $tmp = jQuery('#tmp_content');

            $tmp.html($block.html());

            //Cleaning
            $tmp.find('.elm-active').removeClass('elm-active');
            $tmp.find('.elm-inspected').removeClass('elm-inspected');
            $tmp.find('[contenteditable]').removeAttr('contenteditable');
            $tmp.find('[hideoutline]').removeAttr('hideoutline');
            $tmp.find('[gridoutline]').removeAttr('gridoutline');
            $tmp.find('[draggridoutline]').removeAttr('draggridoutline');
            $tmp.find('[between-blocks-left]').removeAttr('between-blocks-left');
            $tmp.find('[between-blocks-center]').removeAttr('between-blocks-center');
            $tmp.find('[hideelementhighlight]').removeAttr('hideelementhighlight');
            $tmp.find('[minimal]').removeAttr('minimal');
            $tmp.find('[clean]').removeAttr('clean');
            $tmp.find("[data-module-active]").removeAttr('data-module-active');
            $tmp.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
            $tmp.find('.ui-sortable-placeholder').remove();
            $tmp.find('.marker').remove();
            $tmp.find('.cloned-handler').remove();
            $tmp.find('.is-builder > div').css('transform','');
            $tmp.find('.connectSortable').removeClass('connectSortable');
            $tmp.find('.is-row-tool').remove();
            $tmp.find('.ovl').remove();
            //Extra cleaning
            $tmp.find('.aos-init').removeClass('aos-init');
            $tmp.find('.aos-animate').removeClass('aos-animate');
            $tmp.find('.skrollable').removeClass('skrollable');
            $tmp.find('.skrollable-after').removeClass('skrollable-after');
            $tmp.find('.skrollable-before').removeClass('skrollable-before');
            $tmp.find('.skrollable-between').removeClass('skrollable-between');
            //Final cleaning
            $tmp.find('*[class=""]').removeAttr('class');
            $tmp.find('*[style=""]').removeAttr('style');
            $tmp.find('[data-keep]').removeAttr('data-keep');
            //Cleanup button <span contenteditable="false"><a contenteditable="true">button</a></span>
            $tmp.find('a').each(function(){
                if (jQuery(this).css('display') == 'inline-block') {
                    //link button
                    if(jQuery(this).parent().children('a').length ==1 && jQuery(this).parent().prop("tagName").toLowerCase() =='span'){
                        jQuery(this).parent().replaceWith(jQuery(this).parent().html());
                    }
                }
            });

            var html = $tmp.html().trim();
            html = html.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

            jQuery('#tmp_content').remove();

            return html;
        };

        plugin.readCustomCodeBlock = function ($block){

            jQuery('#tmp_content').remove();
            jQuery('body').append('<div id="tmp_content" style="position:absolute;top:0;left:0;width:1px;height:1px;overflow:hidden;visibility:hidden;"></div>');
            var $tmp = jQuery('#tmp_content');

            //Find editable areas in code blocks and save them to data-html-1, data-html-2, and so on for later reading
            var index = 1;
            $block.find('.is-builder').each(function () {
                var html = jQuery(this).html();

                //Clean html without custom code
                $tmp.html(html);
                $tmp.find('.elm-active').removeClass('elm-active');
                $tmp.find('.elm-inspected').removeClass('elm-inspected');
                $tmp.find('.cell-active').removeClass('cell-active');
                $tmp.find('.row-active').removeClass('row-active');
                $tmp.find('.row-outline').removeClass('row-outline');
                //$tmp.find('.is-builder').removeClass('is-builder');
                $tmp.find('[contenteditable]').removeAttr('contenteditable');
                $tmp.find("[data-module-active]").removeAttr('data-module-active');
                $tmp.find('.ui-sortable-handle').removeClass('ui-sortable-handle');
                $tmp.find('.ui-sortable-placeholder').remove();
                $tmp.find('.marker').remove();
                $tmp.find('.cloned-handler').remove();
                $tmp.children('div').css('transform','');
                $tmp.find('.connectSortable').removeClass('connectSortable');
                $tmp.find('.is-row-tool').remove();
                $tmp.find('.ovl').remove();
                $tmp.find('.row-add-initial').remove();
                //Extra cleaning
                $tmp.find('.aos-init').removeClass('aos-init');
                $tmp.find('.aos-animate').removeClass('aos-animate');
                $tmp.find('.skrollable').removeClass('skrollable');
                $tmp.find('.skrollable-after').removeClass('skrollable-after');
                $tmp.find('.skrollable-before').removeClass('skrollable-before');
                $tmp.find('.skrollable-between').removeClass('skrollable-between');
                //Final cleaning
                $tmp.find('*[class=""]').removeAttr('class');
                $tmp.find('*[style=""]').removeAttr('style');
                $tmp.find('[data-keep]').removeAttr('data-keep');

                var html = $tmp.html().trim();
                html = html.replace(/<font/g, '<span').replace(/<\/font/g, '</span');

                $block.attr('data-html-' + index, encodeURIComponent(html));
                index++;
            });

            var html = decodeURIComponent($block.attr('data-html'));

            html = html.replace(/{id}/g, makeid());

            jQuery('#tmp_content').remove();

            return html;
        };

        plugin.renderCustomCodeBlock = function ($block, html) {

            if(html){
                $block.attr('data-html',encodeURIComponent(html));
            } else {
                html = decodeURIComponent($block.attr('data-html'));
            }

            html = html.replace(/{id}/g, makeid());

            for(var i=1;i<=20;i++){
                html = html.replace('[%HTML'+i+'%]', ($block.attr('data-html-'+i) === undefined ? '' : decodeURIComponent($block.attr('data-html-'+i))));//render editable area
            }
            $block.html(html);
        };


        /* ------------------- Helpers (editing) --------------------- */

        plugin.pickColor = function (callback, defaultcolor) {

            var $modal = jQuery('.is-modal.pickcolor');
            plugin.showModal($modal, false, false, null, false);

            if(defaultcolor) {
                $modal.find('.more .input-text').val(defaultcolor);
                $modal.find('.more .is-color-preview').css('background-color', defaultcolor);
                $modal.find('.more .is-color-preview').attr('data-color', defaultcolor);
            } else {
                $modal.find('.more .input-text').val('');
                $modal.find('.more .is-color-preview').css('background-color', '');
                $modal.find('.more .is-color-preview').attr('data-color', '');
            }

            jQuery('.gradient').css('left', '0px');
            jQuery('.gradient').addClass('gradient-anim');

            $modal.find('.input-more').off('click');
            $modal.find('.input-more').on('click', function (e) {
                if ($modal.find('.more').hasClass('active')) {
                    $modal.find('.more').removeClass('active');
                    $modal.find('.more').addClass('deactive');
                } else {
                    $modal.find('.more').addClass('active');
                    $modal.find('.more').removeClass('deactive');
                }
            });

            $modal.find('button').not('.input-more,.input-mode').off('click');
            $modal.find('button').not('.input-more,.input-mode').on('click', function (e) {

                var base = jQuery(this).attr('data-color');

                //Show gradient
                if (!jQuery(e.target).hasClass('clear') && !jQuery(e.target).hasClass('input-ok') && jQuery(e.target).parents('.input-ok').length == 0 && base != '#ffffff' && base != '#000000') {
                    jQuery('.gradient').removeClass('gradient-anim');

                    if(jQuery(e.target).parents('.gradient').length>0){
                        var _left = parseInt(jQuery('.gradient').css('left'));
                        _left = _left-180;
                        if(_left<=-315)_left=-315;
                        jQuery('.gradient').css('left', _left + 'px');
                    } else {
                        jQuery('.gradient').css('left', '0px');
                    }

                    if(jQuery(e.target).parents('.gradient').length==0){

                        var color;
                        prevcolor = '';
                        for (i = 0; i <= 13; i++) {

                            var percent;
                            if(i==0) percent = -60;
                            if(i==1) percent = -30;
                            if(i==2) percent = 0;
                            if(i==3) percent = 30;
                            if(i==4) percent = 50;
                            if(i==5) percent = 70;
                            if(i==6) percent = 90;
                            if(i==7) percent = 100;
                            if(i==8) percent = 110;
                            if(i==9) percent = 120;
                            if(i==10) percent = 130;
                            if(i==11) percent = 150;
                            if(i==12) percent = 170;
                            if(i==13) percent = 200;
                            if(prevcolor=='#b7b7b7'){
                                color = '#bfbfbf';
                            }
                            else if(prevcolor=='#bfbfbf'){
                                color = '#cbcbcb';
                            }
                            else if(prevcolor=='#cbcbcb'){
                                color = '#d3d3d3';
                            }
                            else if(prevcolor=='#d0d0d0' || prevcolor=='#d3d3d3'){
                                color = '#d9d9d9';
                            }
                            else if(prevcolor=='#d9d9d9' || prevcolor=='#dadada'){
                                color = '#e3e3e3';
                            }
                            else if(prevcolor=='#e3e3e3' || prevcolor=='#e4e4e4'){
                                color = '#eaeaea';
                            }
                            else if(prevcolor=='#eaeaea'){
                                color = '#efefef';
                            }
                            else if(prevcolor=='#efefef'){
                                color = '#f3f3f3';
                            }
                            else if(prevcolor=='#f3f3f3'){
                                color = '#f8f8f8';
                            }
                            else if(prevcolor=='#f8f8f8'){
                                color = '#fafafa';
                            }
                            else if(prevcolor=='#fafafa'){
                                color = '#fcfcfc';
                            }
                            else if(prevcolor=='#fcfcfc'){
                                color = '#fdfdfd';
                            }
                            else if(prevcolor=='#fdfdfd'){
                                color = '#fefefe';
                            }
                            else if(prevcolor=='#fefefe'){
                                color = '#ffffff';
                            } else {
                                color = plugin.LightenDarkenColor(base, percent);
                            }
                            prevcolor = color;
                            //var percent = (i-2) * 20; //Make percentage darken/lighten color from -40 to 100
                            var $button = jQuery(e.target).parent().parent().find('.gradient button:eq(' + i + ')');
                            //$button.html(color)
                            $button.attr('data-color', color);
                            $button.css('background-color', color);
                            $button.css('border', color + ' 1px solid');
                        }
                    }
                }

                if (jQuery(e.target).hasClass('input-ok') || jQuery(e.target).parents('.input-ok').length>0) {
                    base = $modal.find('.more input[type=text]').val();
                    $modal.find('.more .is-color-preview').css('background-color', base);
                    $modal.find('.more .is-color-preview').attr('data-color', base);
                } else {
                    $modal.find('.more input[type=text]').val(base);
                    $modal.find('.more .is-color-preview').css('background-color', base);
                    $modal.find('.more .is-color-preview').attr('data-color', base);
                }

                callback(base);

                //Trigger Change event
                plugin.settings.onChange();

            });

        };

        plugin.applyLargerImage = function (s){
            jQuery('.is-modal.imagelink .input-link').val(s);

            jQuery("#form-upload-larger svg").removeClass('please-wait');

            jQuery('#fileImage').clearInputs();
        };

        plugin.addSnippet = function (html, bSnippet, noedit) {

            if (bSnippet) {

                /*
                Buttons, line, social, video, map (Grid layout not included).
                Can be inserted after current row, cell, element, or last row.
                */
                if (noedit) {
                    this.addContent(html, 'data-noedit');
                } else {
                    this.addContent(html);
                }

            } else {

                /*
                Complete with grid layout. Also may containes custom script(data-html)
                Can be inserted after current row or last row.
                */
                this.addContentMore(html);

            }

            var $modal = jQuery('.is-modal.snippets');
            $modal.removeClass('active');
        };

        plugin.selectFile = function (s) {
            var $modal = jQuery('.is-modal.fileselect');
            var $targetInput = jQuery('.is-modal.createlink').find('.input-url');
            $targetInput.val(s);
            $targetInput.trigger('focus');
            $modal.removeClass('active');
        };

        plugin.selectImage = function (s) {
            var $modal = jQuery('.is-modal.imageselect');
            if(jQuery('.is-modal.imagelink').hasClass('active')){
                var $targetInput = jQuery('.is-modal.imagelink').find('.input-src');
            }
            if(jQuery('.is-modal.insertimage').hasClass('active')){
                var $targetInput = jQuery('.is-modal.insertimage').find('.input-src');
            }
            $targetInput.val(s);
            $targetInput.trigger('focus');
            $modal.removeClass('active');
        };

        plugin.insertIcon = function (classname){

            //Save for Undo
            plugin.saveForUndo();

            plugin.restoreSelection();
            plugin.pasteHtmlAtCaret('<i class="' + classname + '"></i>', true);

            plugin.renderRowAddTool();

            //Trigger Change event
            this.settings.onChange();

            //Trigger Render event
            this.settings.onRender();
        };

        var arrSizes = [12, 14, 16, 18, 21, 24, 28, 32, 35, 38, 42, 46, 48, 50, 54, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220];

        plugin.changeIcon = function (classname){

            //Save for Undo
            plugin.saveForUndo();

            var $icon = jQuery('#divIconTool').data('active');
            var $block = jQuery('#divCellTool').data('active');

            var classsize = "";
            for(var i=12;i<221;i++){
                if ($icon.hasClass('size-'+i)) {
                    classsize = 'size-'+i;
                    $icon.removeClass('size-'+i);
                }
            }

            if (classname.indexOf('size-') == -1 && classname != '-' && classname != '+' && classname != '') {
                //Change icon
                $icon.attr('class', classname);
                if (classsize != '') $icon.addClass(classsize);
            } else {
                //Change size
                if((classname=='+'||classname=='-') && classsize=='') {
                    var size = parseInt($icon.css('font-size'));
                    for(var i=0;i<=arrSizes.length-1;i++){
                        if(size >=arrSizes[i] & size <arrSizes[i+1]){
                            if(arrSizes[i]){
                                classsize = 'size-'+arrSizes[i];
                            }
                        }
                    }
                }

                if(classname=='+') {
                    var i = classsize.replace('size-','') *1;
                    var idx = arrSizes.indexOf(i);
                    if(idx<arrSizes.length-1) {
                        classsize = 'size-' + arrSizes[idx+1];
                    }
                    $icon.addClass(classsize);
                } else if (classname=='-') {
                    var i = classsize.replace('size-','') *1;
                    var idx = arrSizes.indexOf(i);
                    if(idx>=1) {
                        classsize = 'size-' + arrSizes[idx-1];
                    }
                    $icon.addClass(classsize);
                } else {
                    $icon.addClass(classname);
                }
            }

            plugin.renderRowAddTool();

            //Trigger Change event
            this.settings.onChange();
        };

        plugin.applyFontSize = function (classname) {

            //Save for Undo
            plugin.saveForUndo();

            try{
                var el;
                var curr;
                if (window.getSelection) {
                    curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                    if(curr.nodeType==3) {  //ini text node
                        el = curr.parentNode;
                    } else {
                        el = curr;
                    }
                }
                else if (document.selection) {
                    curr = document.selection.createRange();
                    el = document.selection.createRange().parentElement();
                }
            } catch(e) {}

            var $text=jQuery(el);

            var classsize = "";
            for(var i=12;i<221;i++){
                if ($text.hasClass('size-'+i)) {
                    classsize = 'size-'+i;
                    $text.removeClass('size-'+i);
                }
            }

            //Change size
            if((classname=='+'||classname=='-') && classsize=='') {
                var size = parseInt($text.css('font-size'));
                for(var i=0;i<=arrSizes.length-1;i++){
                    if(size >=arrSizes[i] & size <arrSizes[i+1]){
                        if(arrSizes[i]){
                            classsize = 'size-'+arrSizes[i];
                        }
                    }
                }
            }

            if(classname=='+') {
                var i = classsize.replace('size-','') *1;
                var idx = arrSizes.indexOf(i);
                if(idx<arrSizes.length-1) {
                    classsize = 'size-' + arrSizes[idx+1];
                }
                $text.addClass(classsize);
            } else if (classname=='-') {
                var i = classsize.replace('size-','') *1;
                var idx = arrSizes.indexOf(i);
                if(idx>=1) {
                    classsize = 'size-' + arrSizes[idx-1];
                }
                $text.addClass(classsize);
            } else {
                $text.addClass(classname);
            }
            $text.css('font-size','');

            if(!bIsAppleMobile) plugin.restoreSelection();

            plugin.renderRowAddTool();

            //Trigger Change event
            this.settings.onChange();
        };

        plugin.applyFont = function () {

            jQuery("#divRowAddTool").css("opacity", "0");

            //Save for Undo
            plugin.saveForUndo();

            if(bIsAppleMobile) {
                jQuery('[contenteditable]').attr('makeeditable','1'); //flag for contenteditable
                jQuery('[contenteditable]').removeAttr('contenteditable'); //make unedited to prevent keyboard opens on iPad.
            }
            plugin.restoreSelection();
            if(bIsAppleMobile) {
                jQuery('[makeeditable]').attr('contenteditable', 'true'); //return back contenteditable
                jQuery('[makeeditable]').removeAttr('makeeditable'); //remove flag
            }

            var bElmMode = false;
            if(jQuery('.elm-list > a.active').length>0) bElmMode = true;

            if(bElmMode){

                var $elm_selected = jQuery('.elm-list > a.active').data('elm');

                var s = jQuery('.cell-fontfamily-options').attr('data-font-family');

                $elm_selected.css('font-family', s);

                jQuery('#inpElmFontFamily').val(s);

                jQuery('#inpElmInlineStyle').val($elm_selected.get(0).style.cssText);

            } else {

                var text = getSelected();
                try {

                    var el;
                    var curr;
                    if (window.getSelection) {
                        curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                        if(curr.nodeType==3) {  //ini text node
                            el = curr.parentNode;
                        } else {
                            el = curr;
                        }
                        //el = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;

                        //TODO
                        if (el.nodeName != 'H1' && el.nodeName != 'H2' && el.nodeName != 'H3' &&
                            el.nodeName != 'H4' && el.nodeName != 'H5' && el.nodeName != 'H6' &&
                            el.nodeName != 'P') {
                            el = el.parentNode;
                        }
                    }
                    else if (document.selection) {
                        curr = document.selection.createRange();
                        el = document.selection.createRange().parentElement();
                        if (el.nodeName != 'H1' && el.nodeName != 'H2' && el.nodeName != 'H3' &&
                            el.nodeName != 'H4' && el.nodeName != 'H5' && el.nodeName != 'H6' &&
                            el.nodeName != 'P') {
                            el = el.parentElement();
                        }
                    }

                } catch(e) { return; }

                var s = jQuery('.cell-fontfamily-options').attr('data-font-family');

                //jQuery(el).css('font-family', s);
                if (jQuery.trim(text) != '' && jQuery(el).text() != text) {
                    document.execCommand("fontName", false, s);
                    var fontElements = document.getElementsByTagName("font");
                    for (var i = 0, len = fontElements.length; i < len; ++i) {
                        if (fontElements[i].face == s) {
                            fontElements[i].removeAttribute("face");
                            fontElements[i].style.fontFamily = s;
                            selectElementContents(jQuery(fontElements[i]).get(0));
                            if(bIsAppleMobile) jQuery(fontElements[i]).addClass('textblock-active');
                        }
                    }
                }
                else if (jQuery(el).text() == text) {//selection fully mode on text AND element. Use element then.
                    if(jQuery(el).html()){
                        jQuery(el).css('font-family', s);
                    } else {
                        jQuery(el).parent().css('font-family', s);
                    }
                }
                else{
                    jQuery(el).css('font-family', s);
                };
            }

            var o = jQuery('.cell-fontfamily-options').attr('data-font-style');
            if (!o) { o = '' } else { o = ':' + o };

            var fontname = s.split(',')[0];
            var provider = jQuery('.cell-fontfamily-options').attr('data-provider');
            if(provider=='google'){
                var bExist = false;
                var links=document.getElementsByTagName("link");
                for(var i=0;i<links.length;i++) {
                    var sSrc=links[i].href.toLowerCase();
                    sSrc = sSrc.replace(/\+/g,' ').replace(/%20/g,' ');
                    if(sSrc.indexOf(fontname.toLowerCase())!=-1) bExist=true;
                }
                if(!bExist) {

                    if(bElmMode){
                        $elm_selected.parents().each(function () {
                            if (jQuery(this).hasClass('is-builder')) {
                                jQuery(this).append('<link href="//fonts.googleapis.com/css?family=' + fontname + o + '" rel="stylesheet" property="stylesheet" type="text/css">');
                            }
                        });
                    } else {
                        jQuery(el).parents().each(function () {
                            if (jQuery(this).hasClass('is-builder')) {
                                jQuery(this).append('<link href="//fonts.googleapis.com/css?family=' + fontname + o + '" rel="stylesheet" property="stylesheet" type="text/css">');
                            }
                        });
                    }
                }
            }

            if(!bElmMode){

                //if(!bIsAppleMobile) plugin.restoreSelection();

                //save selection
                plugin.saveSelection(); //Needed because after format, a tag is added (ex. <span>), so, make selection again.

                if(bIsAppleMobile) jQuery('.cell-fontfamily').focus(); //prevent keyboard open

                plugin.getState();

            }

            //plugin.renderRowAddTool();
            setTimeout(function () {
                plugin.renderRowAddTool();
                jQuery("#divRowAddTool").css("opacity", "1");
            },600);

            //Trigger Change event
            plugin.settings.onChange();


            //TODO: make function
            //Cleanup Google font css link
            var container = plugin.settings.container;
            jQuery(container).find('link').each(function(){
                var sSrc=jQuery(this).attr('href').toLowerCase();
                if(sSrc.indexOf('googleapis')!=-1) {
                    //get fontname
                    sSrc = sSrc.replace(/\+/g,' ').replace(/%20/g,' ');
                    var fontname = sSrc.substr( sSrc.indexOf('family=') + 7 );
                    if(fontname.indexOf(':') != -1){
                        fontname = fontname.split(':')[0];
                    }
                    if(fontname.indexOf('|') != -1){
                        fontname = fontname.split('|')[0];
                    }
                    //check if fontname used in content
                    var tmp = jQuery('body').html().toLowerCase();

                    var count = tmp.split(fontname).length;

                    if(count<3){
                        //not used
                        var attr = jQuery(this).attr('data-protect');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            //do not delete
                        } else {
                            jQuery(this).attr('data-rel','_del');
                        }
                    }
                }
            });

            jQuery('body').find('[data-rel="_del"]').remove();//del not used google font css link

        };

        plugin.pasteContent = function () {

            //Save for Undo
            plugin.saveForUndo();

            plugin.saveSelection(); //required. Without this, CTRL-A (select element) & CTRL-V won't replace the element, but will paste at the end of the element.

            jQuery('#idContentWord').remove();

            var el;
            var curr;
            if (window.getSelection) {
                curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                if (curr.nodeType == 3) {  //ini text node
                    el = curr.parentNode;
                } else {
                    el = curr;
                }
            }
            else if (document.selection) {
                curr = document.selection.createRange();
                el = document.selection.createRange().parentElement();
            }
            var tmptop = jQuery(el).offset().top;
            jQuery('#divFb').append("<div style='position:absolute;z-index:-1000;top:" + tmptop + "px;left:-1000px;width:1px;height:1px;overflow:auto;' name='idContentWord' id='idContentWord' contenteditable='true'></div>");

            var pasteFrame = document.getElementById("idContentWord");
            pasteFrame.focus();

            setTimeout(function () {

                try {

                    var sPastedText = '';

                    var $editor = jQuery('#idContentWord');

                    //Check video embed
                    var bPasteObject = false;
                    var src = $editor.text();
                    var youRegex = /^http[s]?:\/\/(((www.youtube.com\/watch\?(feature=player_detailpage&)?)v=)|(youtu.be\/))([^#\&\?]*)/;
                    var vimeoRegex = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/)|(video\/))?([0-9]+)\/?/;
                    var youRegexMatches = youRegex.exec(src);
                    var vimeoRegexMatches = vimeoRegex.exec(src);
                    if (youRegexMatches != null || vimeoRegexMatches != null) {
                        if (youRegexMatches != null && youRegexMatches.length >= 7) {
                            var youMatch = youRegexMatches[6];
                            src = '//www.youtube.com/embed/' + youMatch + '?rel=0';
                        }
                        if (vimeoRegexMatches != null && vimeoRegexMatches.length >= 7) {
                            var vimeoMatch = vimeoRegexMatches[6];
                            src = '//player.vimeo.com/video/' + vimeoMatch;
                        }
                        sPastedText = '<div class="embed-responsive embed-responsive-16by9"><iframe width="560" height="315" src="' + src + '" frameborder="0" allowfullscreen=""></iframe></div>';
                        bPasteObject = true;
                    }

                    if(!bPasteObject) {
                        if(plugin.settings.paste=='text'){

                            $editor.find('p,h1,h2,h3,h4,h5,h6').each(function(){
                                jQuery(this).html(jQuery(this).html()+' '); //add space (&nbsp;)
                            });

                            sPastedText = $editor.text();

                        } else {

                            sPastedText = $editor.html();

                            if(plugin.settings.paste=='html'){//with styles
                                sPastedText = cleanHTML(sPastedText, false);
                            } else { //html-without-styles (default)
                                sPastedText = cleanHTML(sPastedText, true);
                            }

                            $editor.html(sPastedText);

                            if($editor.children('p,h1,h2,h3,h4,h5,h6,ul,li').length>1){
                                //Fix text that doesn't have paragraph
                                $editor.contents().filter(function() {
                                    return (this.nodeType == 3 && jQuery.trim(this.nodeValue)!='');
                                }).wrap( "<p></p>" ).end().filter("br").remove();
                            }


                            // Source: https://gist.github.com/sbrin/6801034
                            jQuery('p', $editor).each(function(){
                                var str = jQuery(this).attr('style');
                                var matches = /mso-list:\w+ \w+([0-9]+)/.exec(str);
                                if (matches) {
                                    jQuery(this).data('_listLevel',  parseInt(matches[1], 10));
                                }
                            });
                            var last_level=0;
                            var pnt = null;
                            jQuery('p', $editor).each(function(){
                                var cur_level = jQuery(this).data('_listLevel');
                                if(cur_level != undefined){
                                    var txt = jQuery(this).text();
                                    var list_tag = '<ul></ul>';
                                    if (/^\s*\w+\./.test(txt)) {
                                        var matches = /([0-9])\./.exec(txt);
                                        if (matches) {
                                            var start = parseInt(matches[1], 10);
                                            list_tag = start>1 ? '<ol start="' + start + '"></ol>' : '<ol></ol>';
                                        }else{
                                            list_tag = '<ol></ol>';
                                        }
                                    }

                                    if(cur_level>last_level){
                                        if(last_level==0){
                                            jQuery(this).before(list_tag);
                                            pnt = jQuery(this).prev();
                                        }else{
                                            pnt = jQuery(list_tag).appendTo(pnt);
                                        }
                                    }
                                    if(cur_level<last_level){
                                        for(var i=0; i<last_level-cur_level; i++){
                                            pnt = pnt.parent();
                                        }
                                    }
                                    jQuery('span:first', this).remove();
                                    pnt.append('<li>' + jQuery(this).html() + '</li>');
                                    jQuery(this).remove();
                                    last_level = cur_level;
                                }else{
                                    last_level = 0;
                                }
                            });
                            //jQuery('[style]', $editor).removeAttr('style'); //done (see cleanHTML)
                            jQuery('[align]', $editor).removeAttr('align');
                            //jQuery('span', $editor).replaceWith(function() {return jQuery(this).contents();}); //done (see cleanHTML)
                            jQuery('span:empty', $editor).remove();
                            //jQuery("[class^='Mso']", $editor).removeAttr('class'); //done (see cleanHTML)
                            jQuery('p:empty', $editor).remove();


                            sPastedText = $editor.html();

                        }
                    }

                    jQuery('#idContentWord').remove();

                    jQuery('.cell-active').find('.elm-active').removeClass('elm-active');
                    jQuery("#divElementTool").css("display", "none"); //force hide ellement tool

                    plugin.restoreSelection();

                    var oSel = window.getSelection();
                    var range = oSel.getRangeAt(0);
                    range.extractContents();
                    range.collapse(true);
                    var docFrag = range.createContextualFragment(sPastedText);
                    var lastNode = docFrag.lastChild;

                    range.insertNode(docFrag);

                    //Fix HTML structure (Sometimes h1 can be pasted inside p)
                    var $block = jQuery('#divCellTool').data('active');
                    $block.children('h1,h2,h3,h4,h5,p').each(function(){
                        if(jQuery(this).find('h1,h2,h3,h4,h5,p').length>0){
                            jQuery(this).replaceWith(jQuery(this).html());
                        }
                    });
                    //$block.find('i:empty').not('.icon').remove();
                    $block.find('h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty,p:empty').remove();

                    range.setStartAfter(lastNode);
                    range.setEndAfter(lastNode);
                    range.collapse(false);
                    var comCon = range.commonAncestorContainer;
                    if (comCon && comCon.parentNode) {
                        try { comCon.parentNode.normalize(); } catch (e) { };
                    }
                    oSel.removeAllRanges();
                    oSel.addRange(range);

                    plugin.applyBehavior();

                    plugin.renderRowAddTool();

                    //Trigger Change event
                    plugin.settings.onChange();

                    //Trigger Render event
                    plugin.settings.onRender();

                } catch(e) {

                   jQuery('#idContentWord').remove();

                }

            }, 800);

        };

        // Source: https://css-tricks.com/snippets/javascript/lighten-darken-color/
        plugin.LightenDarkenColor = function (col, amt) {

            var usePound = false;

            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }

            var num = parseInt(col, 16);

            var r = (num >> 16) + amt;

            if (r > 255) r = 255;
            else if (r < 0) r = 0;

            var b = ((num >> 8) & 0x00FF) + amt;

            if (b > 255) b = 255;
            else if (b < 0) b = 0;

            var g = (num & 0x0000FF) + amt;

            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            //return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
            return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
        };

        // source: https://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex
        plugin.getGradient = function (input) {
            var result,
                regExpLib = generateRegExp(),
                rGradientEnclosedInBrackets = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/,// Captures inside brackets - max one additional inner set.
                match = rGradientEnclosedInBrackets.exec(input);

            if (match !== null) {
                result = parseGradient(regExpLib, match[1]);
                if(!result){//caused by match[1] returns without xdeg
                    match[1] = '180deg, ' + match[1];
                    result = parseGradient(regExpLib, match[1]);
                }
                return result;
            } else {
                return null
            }
        };

        // source: http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
        plugin.saveSelection = function () {
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    var ranges = [];
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        ranges.push(sel.getRangeAt(i));
                    }
                    jQuery('#divFb').data('selection', ranges);
                    //document.getElementById('divFb').dataset.selection = ranges;
                    return ranges;
                }
            } else if (document.selection && document.selection.createRange) {
                jQuery('#divFb').data('selection', document.selection.createRange());
                //document.getElementById('divFb').dataset.selection = document.selection.createRange();

                return document.selection.createRange();
            }
            jQuery('#divFb').data('selection', '');
            //document.getElementById('divFb').dataset.selection = '';
            return null;
        };

        plugin.restoreSelection = function () {
            var savedSel = jQuery('#divFb').data('selection');
            //var savedSel = document.getElementById('divFb').dataset.selection;
            if (savedSel) {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    for (var i = 0, len = savedSel.length; i < len; ++i) {
                        sel.addRange(savedSel[i]);
                    }
                } else if (document.selection && savedSel.select) {
                    savedSel.select();
                }
            }
        };

        plugin.undoList = [];

        plugin.saveForUndo = function () {
            //console.log('save');
            this.undoList[30] = this.undoList[29];
            this.undoList[29] = this.undoList[28];
            this.undoList[28] = this.undoList[27];
            this.undoList[27] = this.undoList[26];
            this.undoList[26] = this.undoList[25];
            this.undoList[25] = this.undoList[24];
            this.undoList[24] = this.undoList[23];
            this.undoList[23] = this.undoList[22];
            this.undoList[22] = this.undoList[21];
            this.undoList[21] = this.undoList[20];

            this.undoList[20] =  [this.readHtml($wrapper), null];

            this.undoList[19] = null;
            this.undoList[18] = null;
            this.undoList[17] = null;
            this.undoList[16] = null;
            this.undoList[15] = null;
            this.undoList[14] = null;
            this.undoList[13] = null;
            this.undoList[12] = null;
            this.undoList[11] = null;
            this.undoList[10] = null;
        };

        plugin.doUndo = function () {
            if(!this.undoList[20]) return;
            //console.log('undo');
            this.undoList[10] = this.undoList[11];
            this.undoList[11] = this.undoList[12];
            this.undoList[12] = this.undoList[13];
            this.undoList[13] = this.undoList[14];
            this.undoList[14] = this.undoList[15];
            this.undoList[15] = this.undoList[16];
            this.undoList[16] = this.undoList[17];
            this.undoList[17] = this.undoList[18];
            this.undoList[18] = this.undoList[19];

            this.undoList[19] =  [this.readHtml($wrapper), null];

            sHTML = this.undoList[20][0];
            $wrapper.html(sHTML);
            this.applyBehavior();
            this.settings.onChange();
            this.settings.onRender();

            this.undoList[20] = this.undoList[21];
            this.undoList[21] = this.undoList[22];
            this.undoList[22] = this.undoList[23];
            this.undoList[23] = this.undoList[24];
            this.undoList[24] = this.undoList[25];
            this.undoList[25] = this.undoList[26];
            this.undoList[26] = this.undoList[27];
            this.undoList[27] = this.undoList[28];
            this.undoList[28] = this.undoList[29];
            this.undoList[29] = this.undoList[30];

            //hideAllTools
            this.hideElementTools();
            jQuery("#divCellTool").css("display", "none");
            jQuery('#divRowAddTool').css('display', 'none');
            jQuery(".is-row-tool").css("display", "");
            jQuery("#divRteTool").css("display", "none");
            jQuery(".row-active").removeClass("row-active");
            jQuery(".cell-active").removeClass("cell-active");

            //Element Editing Mode
            if( jQuery('.elementstyles').hasClass('active')) { //Element panel is open
                if(jQuery('[data-saveforundo]').length==1) {
                    jQuery("#divElementTool").data('active', jQuery('[data-saveforundo]').first());
                    jQuery("#divElementTool").data('active-inspected', jQuery('[data-saveforundo]').first());
                    jQuery('.element-edit').trigger('click');
                } else {
                    jQuery('.is-modal-overlay').trigger('click'); //if there is modal opened
                    jQuery('.elementstyles .is-side-close').trigger('click'); //close element panel
                }
            }
        };

        plugin.doRedo = function () {
            if(!this.undoList[19]) return;

            this.undoList[30] = this.undoList[29];
            this.undoList[29] = this.undoList[28];
            this.undoList[28] = this.undoList[27];
            this.undoList[27] = this.undoList[26];
            this.undoList[26] = this.undoList[25];
            this.undoList[25] = this.undoList[24];
            this.undoList[24] = this.undoList[23];
            this.undoList[23] = this.undoList[22];
            this.undoList[22] = this.undoList[21];
            this.undoList[21] = this.undoList[20];

            this.undoList[20] =  [this.readHtml($wrapper), null];

            sHTML = this.undoList[19][0];
            $wrapper.html(sHTML);
            this.applyBehavior();
            this.settings.onChange();
            this.settings.onRender();

            this.undoList[19] = this.undoList[18];
            this.undoList[18] = this.undoList[17];
            this.undoList[17] = this.undoList[16];
            this.undoList[16] = this.undoList[15];
            this.undoList[15] = this.undoList[14];
            this.undoList[14] = this.undoList[13];
            this.undoList[13] = this.undoList[12];
            this.undoList[12] = this.undoList[11];
            this.undoList[11] = this.undoList[10];
            this.undoList[10] = null;

            //hideAllTools
            this.hideElementTools();
            jQuery("#divCellTool").css("display", "none");
            jQuery('#divRowAddTool').css('display', 'none');
            jQuery(".is-row-tool").css("display", "");
            jQuery("#divRteTool").css("display", "none");
            jQuery(".row-active").removeClass("row-active");
            jQuery(".cell-active").removeClass("cell-active");

            //Element Editing Mode
            if( jQuery('.elementstyles').hasClass('active')) { //Element panel is open
                if(jQuery('[data-saveforundo]').length==1) {
                    jQuery("#divElementTool").data('active', jQuery('[data-saveforundo]').first());
                    jQuery("#divElementTool").data('active-inspected', jQuery('[data-saveforundo]').first());
                    jQuery('.element-edit').trigger('click');
                } else {
                    jQuery('.is-modal-overlay').trigger('click'); //if there is modal opened
                    jQuery('.elementstyles .is-side-close').trigger('click'); //close element panel
                }
            }
        };

        /* ------------------- Destroy --------------------- */

        plugin.destroy = function (keepControls) {

            var container = plugin.settings.container;

            jQuery(container).find('.elm-active').removeClass('cell-active');
            jQuery(container).find('.cell-active').removeClass('cell-active');
            jQuery(container).find('.row-active').removeClass('cell-active');
            jQuery(container).find('[contenteditable]').removeAttr('contenteditable');
            jQuery(container).find('.ovl').remove();
            jQuery(container).find('.row-add-initial').remove();
            jQuery(container).children().children().off('click');
            jQuery(container).find('.is-builder').each(function () {
                jQuery(this).find('.elm-active').removeClass('elm-active');
                jQuery(this).find('.elm-inspected').removeClass('elm-inspected');
                jQuery(this).find('.cell-active').removeClass('cell-active');
                jQuery(this).find('.row-active').removeClass('row-active');
                jQuery(this).find('.row-outline').removeClass('row-outline');
                jQuery(this).find('[contenteditable]').removeAttr('contenteditable');
                jQuery(this).find('.ovl').remove();
                jQuery(this).find('.row-add-initial').remove();
                jQuery(this).children().children().off('click');
                jQuery(this).children().children().each(function () {
                    jQuery(this).off('click');
                    jQuery(this).off('keydown');
                    jQuery(this).off('keyup');
                })
            });

            jQuery(container).removeClass('is-builder');
            if (!keepControls) {
                if (jQuery('.is-builder').length == 0) jQuery('#divFb').remove();
            }

        };

        plugin.init();

        plugin.saveForUndo();

        _cb = plugin;

        return plugin;
    };

    /* ------------------- Helpers (Independent) --------------------- */

    //Image Resizer
    var repositionHandler = function (width, height) {
        jQuery('.ui-resizable-n').css('left', (width / 2 - 4) + 'px');
        jQuery('.ui-resizable-e').css('top', (height / 2 - 4) + 'px');
        jQuery('.ui-resizable-s').css('left', (width / 2 - 4) + 'px');
        jQuery('.ui-resizable-w').css('top', (height / 2 - 4) + 'px');
    };

    // Table
    function isEven(someNumber) {
        return (someNumber % 2 == 0) ? true : false;
    }

    function getCellIndex(oTable, oTR, oTD) {
        var nCount = 0;
        var bFinish = false;
        for (var i = 0; i < oTR.cells.length; i++) {
            if (bFinish == false) {
                nCount += oTR.cells[i].colSpan;
            }
            if (oTD == oTR.cells[i]) bFinish = true;
        }
        nCount = nCount - (oTD.colSpan - 1);

        var nCellIndex = nCount - 1;
        return nCellIndex;
    }

    // Image
    function processImage(file, targetImg, processImageDone) { //file can also be an URL (from the same host), ex. file = "/assets/image.jpg";

        if(!file){
            processImageDone();
            return false;
        }

        if (!document.getElementById('myTmpCanvasNoCrop')) {
            var new_canvas = document.createElement('canvas');
            new_canvas.id = 'myTmpCanvasNoCrop';
            new_canvas.style.display = 'none';
            document.querySelector('body').appendChild(new_canvas);
        }

        var imgname, extension;
        if(!file.name){
            //file is an URL
            imgname = file.substr((file.lastIndexOf('/') + 1));
            extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
        } else {
            //file is an image file
            imgname = file.name;
            extension = file.name.substr((file.name.lastIndexOf('.') + 1)).toLowerCase();
        }

        var type, quality;
        if (extension == 'jpg' || extension == 'jpeg') {
            type = 'image/jpeg';
            quality = plugin.settings.imageQuality;
        } else {
            type = 'image/png';
            quality = 1;
        }

        loadImage.parseMetaData(file, function (data) {

            var orientation_num;
            if (data.exif) {
                orientation_num = data.exif.get('Orientation');
            }

            loadImage(
                file,
                function (img) {

                    /*
                    Check orientation
                    http://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images
                    */
                    if (4 < orientation_num && orientation_num < 9) {
                        //potrait
                        nInitialWidth = img.height;
                        nInitialHeight = img.width;
                    } else {
                        //landscape
                        nInitialWidth = img.width;
                        nInitialHeight = img.height;
                    }

                    //Specify target dimension: 2 times bigger than placement, but not more than 1200px
                    var targetWidth = targetImg.clientWidth * 2;
                    if (targetWidth > 1200) targetWidth = 1200;
                    targetWidth = 1200; //force target width to 1200px
                    var targetHeight = (targetWidth * nInitialHeight) / nInitialWidth;

                    //Adjust target dimension (in case image is smaller than targeted dimension)
                    var bResize = false;
                    var targetWidth; var targetHeight;
                    if (nInitialHeight <= targetHeight && nInitialWidth > targetWidth) {
                        //Original height is smaller than placeholder height. Original width is bigger than placeholder width.
                        targetWidth = targetWidth;
                        targetHeight = (nInitialHeight * targetWidth) / nInitialWidth;
                        if (nInitialHeight <= targetHeight) {
                            targetHeight = nInitialHeight;
                            targetWidth = (nInitialHeight * targetWidth) / targetHeight;
                        }
                        bResize = true;
                    } else if (nInitialWidth <= targetWidth && nInitialHeight > targetHeight) {
                        //Original width is smaller than placeholder width. Original height is bigger than placeholder height.
                        targetHeight = targetHeight;
                        targetWidth = (nInitialWidth * targetHeight) / nInitialHeight;
                        if (nInitialWidth <= targetWidth) {
                            targetWidth = nInitialWidth;
                            targetHeight = (nInitialWidth * targetHeight) / targetWidth;
                        }
                        bResize = true;
                    } else if (nInitialWidth <= targetWidth && nInitialHeight <= targetHeight) {
                        //no resize (original image is smaller than placeholder)
                        targetWidth = nInitialWidth;
                        targetHeight = nInitialHeight;
                    } else {
                        targetWidth = targetWidth;
                        targetHeight = (nInitialHeight * targetWidth) / nInitialWidth;
                        bResize = true;
                    }

                    if (type == 'image/png') {
                        bResize = false;
                    }
                    //RENDER (tmpCanvasNoCrop)
                    var mpImg = new MegaPixImage(img);
                    tmpCanvasNoCrop = document.getElementById('myTmpCanvasNoCrop');

                    /*
                    if(!bResize) {
                        //Prevent using mpImg.render
                        jQuery(tmpCanvasNoCrop).attr('width', targetWidth);
                        jQuery(tmpCanvasNoCrop).attr('height', targetHeight);
                        var ctx = tmpCanvasNoCrop.getContext('2d');
                        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                        targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality); //finished
                        tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                        processImageDone();
                        return;
                    }*/

                    mpImg.render(tmpCanvasNoCrop, { width: nInitialWidth, height: nInitialHeight, orientation: orientation_num }, function () {

                        if (bResize) {

                            //RESIZE (tmpCanvasNoCrop) with good quality.
                            var tmpImg = new Image();
                            var nW = nInitialWidth;
                            var nH = nInitialHeight;
                            tmpImg.onload = function () {
                                nW /= 2;
                                nH /= 2;
                                if (nW < targetWidth || nH < targetHeight) { nW = targetWidth; nH = targetHeight; }

                                var mpImg = new MegaPixImage(tmpImg);
                                mpImg.render(tmpCanvasNoCrop, { width: nW, height: nH }, function () { /* must specify both width & height correctly (proportionally) */

                                    if (nW <= targetWidth || nH <= targetHeight) {

                                        targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality); //finished
                                        tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                                        processImageDone();
                                        return false;

                                    }
                                    tmpImg.src = tmpCanvasNoCrop.toDataURL(type, quality);

                                });
                            };
                            tmpImg.src = tmpCanvasNoCrop.toDataURL(type, quality);

                        } else {

                            targetImg.src = tmpCanvasNoCrop.toDataURL(type, quality); //finished
                            tmpCanvasNoCrop.parentNode.removeChild(tmpCanvasNoCrop);
                            processImageDone();
                        }

                    });

                },
                {
                    canvas: false
                }
            );

        });
    };

    // Clean Word. Source:
    // http://patisserie.keensoftware.com/en/pages/remove-word-formatting-from-rich-text-editor-with-javascript
    // http://community.sitepoint.com/t/strip-unwanted-formatting-from-pasted-content/16848/3
    // http://www.1stclassmedia.co.uk/developers/clean-ms-word-formatting.php
    function cleanHTML(input, cleanstyle) {

        var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
        var output = input.replace(stringStripper, ' ');

        var commentSripper = new RegExp('<!--(.*?)-->', 'g');
        var output = output.replace(commentSripper, '');

        if(cleanstyle){
            var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
        } else {
            var tagStripper = new RegExp('<(/)*(meta|link|\\?xml:|st1:|o:|font)(.*?)>', 'gi');
        }
        output = output.replace(tagStripper, '');

        var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];

        for (var i = 0; i < badTags.length; i++) {
            tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
            output = output.replace(tagStripper, '');
        }

        if(cleanstyle){
            var badAttributes = ['style', 'start'];
        } else {
            var badAttributes = ['start'];
        }
        for (var i = 0; i < badAttributes.length; i++) {
            var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
            output = output.replace(attributeStripper, '');
        }


        // https://gist.github.com/sbrin/6801034
        //output = output.replace(/<!--[\s\S]+?-->/gi, ''); //done (see above)
        output = output.replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, '');
        output = output.replace(/<(\/?)s>/gi, "<$1strike>");
        output = output.replace(/&nbsp;/gi, ' ');
        //output = output.replace(/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function(str, spaces) {
        //    return (spaces.length > 0) ? spaces.replace(/./, " ").slice(Math.floor(spaces.length/2)).split("").join("\u00a0") : '';
        //});

        //clean copied elm-active background-color (TODO: improve)
        output = output.replace(/background-color: rgba\(200, 200, 201, 0.11\);/gi, '');
        output = output.replace(/background-color: rgba\(200, 200, 201, 0.11\)/gi, '');

        return output;
    };

    // source: https://stackoverflow.com/questions/6139107/programmatically-select-text-in-a-contenteditable-html-element
    function selectElementContents(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };

    // source: https://stackoverflow.com/questions/2871081/jquery-setting-cursor-position-in-contenteditable-div
    function moveCursorToElement(element, cursorAtStart){
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(element);
            range.collapse(false);
            range.select();
        }
    };

    // Get selected text
    function getSelected() {
        if (window.getSelection) {
            return window.getSelection();
        }
        else if (document.getSelection) {
            return document.getSelection();
        }
        else {
            var selection = document.selection && document.selection.createRange();
            if (selection.text) {
                return selection.text;
            }
            return false;
        }
        return false;
    };

    function checkEditable(){
        try{
            var el;
            var curr;
            if (window.getSelection) {
                curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                if(curr.nodeType==3) {  //ini text node
                    el = curr.parentNode;
                } else {
                    el = curr;
                }
            }
            else if (document.selection) {
                curr = document.selection.createRange();
                el = document.selection.createRange().parentElement();
            }
            if(jQuery(el).parents('[contenteditable]').length>0) return true;
            else return false;
        } catch(e){
            return false;
        }
    };

    // source: http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 2; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        var text2 = "";
        var possible2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));

        return text + text2;
    };

    // source: https://stackoverflow.com/questions/4617638/detect-ipad-users-using-jquery
    function fnIsAppleMobile() {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
            if (arrMatches != null) return true;
        }
        return false;
    };

    //Enable drag on modal dialogs
    function dragStart(e) {
        try{//try for ie
            if (e.target.classList.contains("is-draggable")) {
                dragActive = true;
                activeDraggableBox = e.target.parentElement;
            } else {
                return;
            }
        } catch(e){}

        var xOffset;
        var yOffset;
        if (!activeDraggableBox.getAttribute('data-xOffset')) {
            activeDraggableBox.setAttribute('data-xOffset', 0);
            xOffset = 0;
        } else {
            xOffset = activeDraggableBox.getAttribute('data-xOffset');
        }
        if (!activeDraggableBox.getAttribute('data-yOffset')) {
            activeDraggableBox.setAttribute('data-yOffset', 0);
            yOffset = 0;
        } else {
            yOffset = activeDraggableBox.getAttribute('data-yOffset');
        }
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        activeDraggableBox.setAttribute('data-initialX', initialX);
        activeDraggableBox.setAttribute('data-initialY', initialY);
    };

    function dragEnd(e) {

        if (!e.target.classList.contains("is-draggable")) {
            return;
        }

        //Update
        currentX = activeDraggableBox.getAttribute('data-currentX');
        currentY = activeDraggableBox.getAttribute('data-currentY');
        initialX = currentX;
        initialY = currentY;
        activeDraggableBox.setAttribute('data-initialX', initialX);
        activeDraggableBox.setAttribute('data-initialY', initialY);

        dragActive = false;
    };

    function drag(e) {
        if (dragActive) {

            e.preventDefault();

            var initialX = activeDraggableBox.getAttribute('data-initialX');
            var initialY = activeDraggableBox.getAttribute('data-initialY');

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            activeDraggableBox.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";

            //Save
            activeDraggableBox.setAttribute('data-currentX', currentX);
            activeDraggableBox.setAttribute('data-currentY', currentY);

            xOffset = currentX;
            yOffset = currentY;

            activeDraggableBox.setAttribute('data-xOffset', xOffset);
            activeDraggableBox.setAttribute('data-yOffset', yOffset);
        }
    };

    // source: https://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex
    function combineRegExp(regexpList, flags) {
        var i,
            source = '';
        for (i = 0; i < regexpList.length; i++) {
            if (typeof regexpList[i] === 'string') {
                source += regexpList[i];
            } else {
                source += regexpList[i].source;
            }
        }
        return new RegExp(source, flags);
    };
    function generateRegExp() {
        var searchFlags = 'gi',
            rAngle = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/,
            rSideCornerCapture = /to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?))/,
            rComma = /\s*,\s*/,
            rColorHex = /\#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
            rDigits3 = /\(\s*(?:[0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*\)/,
            rDigits4 = /\(\s*(?:[0-9]{1,3}\s*,\s*){3}[0-9]{1,3}\s*\)/,
            rValue = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/,
            rKeyword = /[_A-Za-z-][_A-Za-z0-9-]*/,
            rColor = combineRegExp([
                '(?:', rColorHex, '|', '(?:rgb|hsl)', rDigits3, '|', '(?:rgba|hsla)', rDigits4, '|', rKeyword, ')'
            ], ''),
            rColorStop = combineRegExp([rColor, '(?:\\s+', rValue, ')?'], ''),
            rColorStopList = combineRegExp(['(?:', rColorStop, rComma, ')*', rColorStop], ''),
            rLineCapture = combineRegExp(['(?:(', rAngle, ')|', rSideCornerCapture, ')'], ''),
            rGradientSearch = combineRegExp([
                '(', rLineCapture, ')', rComma, '(', rColorStopList, ')'
            ], searchFlags),
            rColorStopSearch = combineRegExp([
                '\\s*(', rColor, ')', '(?:\\s+', '(', rValue, '))?', '(?:', rComma, '\\s*)?'
            ], searchFlags);

        return {
            gradientSearch:  rGradientSearch,
            colorStopSearch: rColorStopSearch
        };
    };
    function parseGradient(regExpLib, input) {
        var result,
            matchGradient,
            matchColorStop,
            stopResult;

        matchGradient = regExpLib.gradientSearch.exec(input);
        if (matchGradient !== null) {
            result = {
                original: matchGradient[0],
                colorStopList: []
            };
            if (!!matchGradient[1]) {
                result.line = matchGradient[1];
            }
            if (!!matchGradient[2]) {
                result.angle = matchGradient[2];
            }
            if (!!matchGradient[3]) {
                result.sideCorner = matchGradient[3];
            }
            matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
            while (matchColorStop !== null) {
                stopResult = {
                    color: matchColorStop[1]
                };
                if (!!matchColorStop[2]) {
                    stopResult.position = matchColorStop[2];
                }
                result.colorStopList.push(stopResult);
                matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
            }
        }
        return result;
    };

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        var edge = ua.indexOf('Edge/');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if (edge > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        // other browser
        return false;
    };

    // source: https: //stackoverflow.com/questions/2255689/how-to-get-the-file-path-of-the-currently-executing-javascript-code
    function currentScriptPath() {
        var scripts = document.querySelectorAll('script[src]');
        var currentScript = scripts[scripts.length - 1].src;
        var currentScriptChunks = currentScript.split('/');
        var currentScriptFile = currentScriptChunks[currentScriptChunks.length - 1];
        return currentScript.replace(currentScriptFile, '');
    };

    function out(s) {
        if(bLangFile){
            var result = _txt[s];
            if(result) return result;
            else return s;
        } else {
            return s;
        }
    };

} (jQuery));

//Give access to external functions
var _cb;
function applyLargerImage(s) {
    _cb.applyLargerImage(s);
}
function selectFile(s) {
    _cb.selectFile(s);
}
function selectImage(s) {
    _cb.selectImage(s);
}
function insertIcon(classname) {
    _cb.insertIcon(classname);
}
function changeIcon(classname) {
    _cb.changeIcon(classname);
}
function applyFont() {
    _cb.applyFont();
}
function applyFontSize(classname) {
    _cb.applyFontSize(classname);
}
function _imgLoaded(obj) {
    _cb.renderRowAddTool();
    jQuery("#divRowAddTool").css("opacity", "1");
    jQuery(obj).removeAttr('onload');
}

/* ------------------- Required Plugins --------------------- */

/*
    Color Picker Plugin
*/
(function (jQuery) {

    jQuery.colorpicker = function (element, options) {

        var defaults = {

            color: '',
            onPick: function () { }

        };


        plugin = this;

        plugin.settings = {};

        var $element = jQuery(element),
                    element = element;

        plugin.init = function () {

            this.settings = jQuery.extend({}, defaults, options);

            $element.css('display', 'flex');
            var html = '<div style="width:55px;height:50px;border:1px solid rgba(53, 53, 53, 0.28);border-right:none;box-sizing:border-box;"></div>' +
                '<button title="Select Color" style="width:55px;height:50px;border:1px solid rgba(53, 53, 53, 0.28)"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.8);width:12px;height:12px;"><use xlink:href="#ion-contrast"></use></svg></button>';

            $element.html(html);

            $element.children('div').css('background-color', plugin.settings.color);

            $element.children('button').on('click', function () {

                _cb.pickColor(function (color) {

                    $element.data('colorpicker').settings.onPick(color);

                    $element.data('colorpicker').settings.color = color;

                    $element.children('div').css('background-color', color);

                }, $element.data('colorpicker').settings.color);
            });

        };

        plugin.color = function () {
            return $element.data('colorpicker').settings.color;
        };

        plugin.setColor = function (color) {
            $element.children('div').css('background-color', color);

            $element.data('colorpicker').settings.color = color;

            $element.children('button').off('click');
            $element.children('button').on('click', function () {
                _cb.pickColor(function (color) {

                    $element.data('colorpicker').settings.onPick(color);

                    $element.data('colorpicker').settings.color = color;

                    $element.children('div').css('background-color', color);

                }, $element.data('colorpicker').settings.color);
            });

        };

        plugin.init();

    };

    jQuery.fn.colorpicker = function (options) {
        return this.each(function () {

            if (undefined == jQuery(this).data('colorpicker')) {
                var plugin = new jQuery.colorpicker(this, options);
                jQuery(this).data('colorpicker', plugin);

            }
        });
    };
})(jQuery);

/*
source:
http://stackoverflow.com/questions/1043957/clearing-input-type-file-using-jquery
https://github.com/malsup/form/blob/master/jquery.form.js
*/
jQuery.fn.clearFields = jQuery.fn.clearInputs = function (includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function () {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
        else if (t == "file") {
            if (/MSIE/.test(navigator.userAgent)) {
                jQuery(this).replaceWith(jQuery(this).clone(true));
            } else {
                jQuery(this).val('');
            }
        }
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  jQuery('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ((includeHidden === true && /hidden/.test(t)) ||
                (typeof includeHidden == 'string' && jQuery(this).is(includeHidden)))
                this.value = '';
        }
    });
};

/*
source:
https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
*/
(function( cursorManager ) {

    var voidNodeTags = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'MENUITEM', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR', 'BASEFONT', 'BGSOUND', 'FRAME', 'ISINDEX'];

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };
    function canContainText(node) {
        if(node.nodeType == 1) { //is an element node
            return !voidNodeTags.contains(node.nodeName);
        } else { //is not an element node
            return false;
        }
    };
    function getLastChildElement(el){
        var lc = el.lastChild;
        while(lc && lc.nodeType != 1) {
            if(lc.previousSibling)
                lc = lc.previousSibling;
            else
                break;
        }
        return lc;
    };
    cursorManager.setEndOfContenteditable = function(contentEditableElement)
    {

        while(getLastChildElement(contentEditableElement) &&
              canContainText(getLastChildElement(contentEditableElement))) {
            contentEditableElement = getLastChildElement(contentEditableElement);
        }

        var range,selection;
        if(document.createRange)
        {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        else if(document.selection)
        {
            range = document.body.createTextRange();
            range.moveToElementText(contentEditableElement);
            range.collapse(false);
            range.select();
        }
    };

}( window.cursorManager = window.cursorManager || {}));

/*
source:
https://stackoverflow.com/questions/15804296/how-to-prevent-doubletap-zoom-in-ios-and-android
https://stackoverflow.com/questions/3103842/safari-ipad-prevent-zoom-on-double-tap
*/
jQuery.fn.noDoubleTapZoom = function() {
    $(this).bind('touchstart', function preventZoom(e){
        if(!checkEditable()){
            var t2 = e.timeStamp;
            var t1 = $(this).data('lastTouch') || t2;
            var dt = t2 - t1;
            var fingers = e.originalEvent.touches.length;
            $(this).data('lastTouch', t2);
            if (!dt || dt > 500 || fingers > 1){
                return; // not double-tap
            }


            e.preventDefault(); // double tap - prevent the zoom

            // also synthesize click events we just swallowed up
            //$(e.target).trigger('click');
            $(this).trigger('click').trigger('click');
        }
    });

    function checkEditable(){
        try{
            var el;
            var curr;
            if (window.getSelection) {
                curr = window.getSelection().getRangeAt(0).commonAncestorContainer;
                if(curr.nodeType==3) {  //ini text node
                    el = curr.parentNode;
                } else {
                    el = curr;
                }
            }
            else if (document.selection) {
                curr = document.selection.createRange();
                el = document.selection.createRange().parentElement();
            }
            if(jQuery(el).parents('[contenteditable]').length>0) return true;
            else return false;
        } catch(e){
            return false;
        }
    };
};

/*!
 * Cropper.js v1.4.3
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-10-24T13:07:15.032Z
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):t.Cropper=i()}(this,function(){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,i){for(var e=0;e<i.length;e++){var a=i[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function bt(t){return function(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o="undefined"!=typeof window,h=o?window:{},d="cropper",k="all",T="crop",E="move",W="zoom",N="e",H="w",L="s",O="n",z="ne",Y="nw",X="se",R="sw",r="".concat(d,"-crop"),t="".concat(d,"-disabled"),S="".concat(d,"-hidden"),l="".concat(d,"-hide"),p="".concat(d,"-invisible"),s="".concat(d,"-modal"),m="".concat(d,"-move"),g="".concat(d,"Action"),u="".concat(d,"Preview"),c="crop",f="move",v="none",a="crop",w="cropend",b="cropmove",x="cropstart",y="dblclick",M=h.PointerEvent?"pointerdown":"touchstart mousedown",C=h.PointerEvent?"pointermove":"touchmove mousemove",D=h.PointerEvent?"pointerup pointercancel":"touchend touchcancel mouseup",B="ready",A="resize",I="wheel mousewheel DOMMouseScroll",j="zoom",U="image/jpeg",P=/^(?:e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,q=/^data:/,$=/^data:image\/jpeg;base64,/,Q=/^(?:img|canvas)$/i,Z={viewMode:0,dragMode:c,initialAspectRatio:NaN,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},e=Number.isNaN||h.isNaN;function F(t){return"number"==typeof t&&!e(t)}function K(t){return void 0===t}function G(t){return"object"===i(t)&&null!==t}var V=Object.prototype.hasOwnProperty;function J(t){if(!G(t))return!1;try{var i=t.constructor,e=i.prototype;return i&&e&&V.call(e,"isPrototypeOf")}catch(t){return!1}}function _(t){return"function"==typeof t}function tt(i,e){if(i&&_(e))if(Array.isArray(i)||F(i.length)){var t,a=i.length;for(t=0;t<a&&!1!==e.call(i,i[t],t,i);t+=1);}else G(i)&&Object.keys(i).forEach(function(t){e.call(i,i[t],t,i)});return i}var it=Object.assign||function(e){for(var t=arguments.length,i=new Array(1<t?t-1:0),a=1;a<t;a++)i[a-1]=arguments[a];return G(e)&&0<i.length&&i.forEach(function(i){G(i)&&Object.keys(i).forEach(function(t){e[t]=i[t]})}),e},et=/\.\d*(?:0|9){12}\d*$/;function xt(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1e11;return et.test(t)?Math.round(t*i)/i:t}var at=/^(?:width|height|left|top|marginLeft|marginTop)$/;function nt(t,i){var e=t.style;tt(i,function(t,i){at.test(i)&&F(t)&&(t+="px"),e[i]=t})}function ot(t,i){if(i)if(F(t.length))tt(t,function(t){ot(t,i)});else if(t.classList)t.classList.add(i);else{var e=t.className.trim();e?e.indexOf(i)<0&&(t.className="".concat(e," ").concat(i)):t.className=i}}function ht(t,i){i&&(F(t.length)?tt(t,function(t){ht(t,i)}):t.classList?t.classList.remove(i):0<=t.className.indexOf(i)&&(t.className=t.className.replace(i,"")))}function rt(t,i,e){i&&(F(t.length)?tt(t,function(t){rt(t,i,e)}):e?ot(t,i):ht(t,i))}var st=/([a-z\d])([A-Z])/g;function ct(t){return t.replace(st,"$1-$2").toLowerCase()}function dt(t,i){return G(t[i])?t[i]:t.dataset?t.dataset[i]:t.getAttribute("data-".concat(ct(i)))}function lt(t,i,e){G(e)?t[i]=e:t.dataset?t.dataset[i]=e:t.setAttribute("data-".concat(ct(i)),e)}var pt=/\s\s*/,mt=function(){var t=!1;if(o){var i=!1,e=function(){},a=Object.defineProperty({},"once",{get:function(){return t=!0,i},set:function(t){i=t}});h.addEventListener("test",e,a),h.removeEventListener("test",e,a)}return t}();function gt(e,t,a){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},o=a;t.trim().split(pt).forEach(function(t){if(!mt){var i=e.listeners;i&&i[t]&&i[t][a]&&(o=i[t][a],delete i[t][a],0===Object.keys(i[t]).length&&delete i[t],0===Object.keys(i).length&&delete e.listeners)}e.removeEventListener(t,o,n)})}function ut(o,t,h){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},s=h;t.trim().split(pt).forEach(function(a){if(r.once&&!mt){var t=o.listeners,n=void 0===t?{}:t;s=function(){delete n[a][h],o.removeEventListener(a,s,r);for(var t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];h.apply(o,i)},n[a]||(n[a]={}),n[a][h]&&o.removeEventListener(a,n[a][h],r),n[a][h]=s,o.listeners=n}o.addEventListener(a,s,r)})}function ft(t,i,e){var a;return _(Event)&&_(CustomEvent)?a=new CustomEvent(i,{detail:e,bubbles:!0,cancelable:!0}):(a=document.createEvent("CustomEvent")).initCustomEvent(i,!0,!0,e),t.dispatchEvent(a)}function vt(t){var i=t.getBoundingClientRect();return{left:i.left+(window.pageXOffset-document.documentElement.clientLeft),top:i.top+(window.pageYOffset-document.documentElement.clientTop)}}var wt=h.location,yt=/^(https?:)\/\/([^:/?#]+):?(\d*)/i;function Mt(t){var i=t.match(yt);return i&&(i[1]!==wt.protocol||i[2]!==wt.hostname||i[3]!==wt.port)}function Ct(t){var i="timestamp=".concat((new Date).getTime());return t+(-1===t.indexOf("?")?"?":"&")+i}function Dt(t){var i=t.rotate,e=t.scaleX,a=t.scaleY,n=t.translateX,o=t.translateY,h=[];F(n)&&0!==n&&h.push("translateX(".concat(n,"px)")),F(o)&&0!==o&&h.push("translateY(".concat(o,"px)")),F(i)&&0!==i&&h.push("rotate(".concat(i,"deg)")),F(e)&&1!==e&&h.push("scaleX(".concat(e,")")),F(a)&&1!==a&&h.push("scaleY(".concat(a,")"));var r=h.length?h.join(" "):"none";return{WebkitTransform:r,msTransform:r,transform:r}}function Bt(t,i){var e=t.pageX,a=t.pageY,n={endX:e,endY:a};return i?n:it({startX:e,startY:a},n)}var kt=Number.isFinite||h.isFinite;function Tt(t){var i=t.aspectRatio,e=t.height,a=t.width,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"contain",o=function(t){return kt(t)&&0<t};if(o(a)&&o(e)){var h=e*i;"contain"===n&&a<h||"cover"===n&&h<a?e=a/i:a=e*i}else o(a)?e=a/i:o(e)&&(a=e*i);return{width:a,height:e}}var Et=String.fromCharCode;var Wt=/^data:.*,/;function Nt(t){var i,e=new DataView(t);try{var a,n,o;if(255===e.getUint8(0)&&216===e.getUint8(1))for(var h=e.byteLength,r=2;r+1<h;){if(255===e.getUint8(r)&&225===e.getUint8(r+1)){n=r;break}r+=1}if(n){var s=n+10;if("Exif"===function(t,i,e){var a,n="";for(e+=i,a=i;a<e;a+=1)n+=Et(t.getUint8(a));return n}(e,n+4,4)){var c=e.getUint16(s);if(((a=18761===c)||19789===c)&&42===e.getUint16(s+2,a)){var d=e.getUint32(s+4,a);8<=d&&(o=s+d)}}}if(o){var l,p,m=e.getUint16(o,a);for(p=0;p<m;p+=1)if(l=o+12*p+2,274===e.getUint16(l,a)){l+=8,i=e.getUint16(l,a),e.setUint16(l,1,a);break}}}catch(t){i=1}return i}var Ht={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var t=this.element,i=this.options,e=this.container,a=this.cropper;ot(a,S),ht(t,S);var n={width:Math.max(e.offsetWidth,Number(i.minContainerWidth)||200),height:Math.max(e.offsetHeight,Number(i.minContainerHeight)||100)};nt(a,{width:(this.containerData=n).width,height:n.height}),ot(t,S),ht(a,S)},initCanvas:function(){var t=this.containerData,i=this.imageData,e=this.options.viewMode,a=Math.abs(i.rotate)%180==90,n=a?i.naturalHeight:i.naturalWidth,o=a?i.naturalWidth:i.naturalHeight,h=n/o,r=t.width,s=t.height;t.height*h>t.width?3===e?r=t.height*h:s=t.width/h:3===e?s=t.width/h:r=t.height*h;var c={aspectRatio:h,naturalWidth:n,naturalHeight:o,width:r,height:s};c.left=(t.width-r)/2,c.top=(t.height-s)/2,c.oldLeft=c.left,c.oldTop=c.top,this.canvasData=c,this.limited=1===e||2===e,this.limitCanvas(!0,!0),this.initialImageData=it({},i),this.initialCanvasData=it({},c)},limitCanvas:function(t,i){var e=this.options,a=this.containerData,n=this.canvasData,o=this.cropBoxData,h=e.viewMode,r=n.aspectRatio,s=this.cropped&&o;if(t){var c=Number(e.minCanvasWidth)||0,d=Number(e.minCanvasHeight)||0;1<h?(c=Math.max(c,a.width),d=Math.max(d,a.height),3===h&&(c<d*r?c=d*r:d=c/r)):0<h&&(c?c=Math.max(c,s?o.width:0):d?d=Math.max(d,s?o.height:0):s&&((c=o.width)<(d=o.height)*r?c=d*r:d=c/r));var l=Tt({aspectRatio:r,width:c,height:d});c=l.width,d=l.height,n.minWidth=c,n.minHeight=d,n.maxWidth=1/0,n.maxHeight=1/0}if(i)if((s?0:1)<h){var p=a.width-n.width,m=a.height-n.height;n.minLeft=Math.min(0,p),n.minTop=Math.min(0,m),n.maxLeft=Math.max(0,p),n.maxTop=Math.max(0,m),s&&this.limited&&(n.minLeft=Math.min(o.left,o.left+(o.width-n.width)),n.minTop=Math.min(o.top,o.top+(o.height-n.height)),n.maxLeft=o.left,n.maxTop=o.top,2===h&&(n.width>=a.width&&(n.minLeft=Math.min(0,p),n.maxLeft=Math.max(0,p)),n.height>=a.height&&(n.minTop=Math.min(0,m),n.maxTop=Math.max(0,m))))}else n.minLeft=-n.width,n.minTop=-n.height,n.maxLeft=a.width,n.maxTop=a.height},renderCanvas:function(t,i){var e=this.canvasData,a=this.imageData;if(i){var n=function(t){var i=t.width,e=t.height,a=t.degree;if(90==(a=Math.abs(a)%180))return{width:e,height:i};var n=a%90*Math.PI/180,o=Math.sin(n),h=Math.cos(n),r=i*h+e*o,s=i*o+e*h;return 90<a?{width:s,height:r}:{width:r,height:s}}({width:a.naturalWidth*Math.abs(a.scaleX||1),height:a.naturalHeight*Math.abs(a.scaleY||1),degree:a.rotate||0}),o=n.width,h=n.height,r=e.width*(o/e.naturalWidth),s=e.height*(h/e.naturalHeight);e.left-=(r-e.width)/2,e.top-=(s-e.height)/2,e.width=r,e.height=s,e.aspectRatio=o/h,e.naturalWidth=o,e.naturalHeight=h,this.limitCanvas(!0,!1)}(e.width>e.maxWidth||e.width<e.minWidth)&&(e.left=e.oldLeft),(e.height>e.maxHeight||e.height<e.minHeight)&&(e.top=e.oldTop),e.width=Math.min(Math.max(e.width,e.minWidth),e.maxWidth),e.height=Math.min(Math.max(e.height,e.minHeight),e.maxHeight),this.limitCanvas(!1,!0),e.left=Math.min(Math.max(e.left,e.minLeft),e.maxLeft),e.top=Math.min(Math.max(e.top,e.minTop),e.maxTop),e.oldLeft=e.left,e.oldTop=e.top,nt(this.canvas,it({width:e.width,height:e.height},Dt({translateX:e.left,translateY:e.top}))),this.renderImage(t),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(t){var i=this.canvasData,e=this.imageData,a=e.naturalWidth*(i.width/i.naturalWidth),n=e.naturalHeight*(i.height/i.naturalHeight);it(e,{width:a,height:n,left:(i.width-a)/2,top:(i.height-n)/2}),nt(this.image,it({width:e.width,height:e.height},Dt(it({translateX:e.left,translateY:e.top},e)))),t&&this.output()},initCropBox:function(){var t=this.options,i=this.canvasData,e=t.aspectRatio||t.initialAspectRatio,a=Number(t.autoCropArea)||.8,n={width:i.width,height:i.height};e&&(i.height*e>i.width?n.height=n.width/e:n.width=n.height*e),this.cropBoxData=n,this.limitCropBox(!0,!0),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),n.width=Math.max(n.minWidth,n.width*a),n.height=Math.max(n.minHeight,n.height*a),n.left=i.left+(i.width-n.width)/2,n.top=i.top+(i.height-n.height)/2,n.oldLeft=n.left,n.oldTop=n.top,this.initialCropBoxData=it({},n)},limitCropBox:function(t,i){var e=this.options,a=this.containerData,n=this.canvasData,o=this.cropBoxData,h=this.limited,r=e.aspectRatio;if(t){var s=Number(e.minCropBoxWidth)||0,c=Number(e.minCropBoxHeight)||0,d=h?Math.min(a.width,n.width,n.width+n.left,a.width-n.left):a.width,l=h?Math.min(a.height,n.height,n.height+n.top,a.height-n.top):a.height;s=Math.min(s,a.width),c=Math.min(c,a.height),r&&(s&&c?s<c*r?c=s/r:s=c*r:s?c=s/r:c&&(s=c*r),d<l*r?l=d/r:d=l*r),o.minWidth=Math.min(s,d),o.minHeight=Math.min(c,l),o.maxWidth=d,o.maxHeight=l}i&&(o.maxTop=h?(o.minLeft=Math.max(0,n.left),o.minTop=Math.max(0,n.top),o.maxLeft=Math.min(a.width,n.left+n.width)-o.width,Math.min(a.height,n.top+n.height)-o.height):(o.minLeft=0,o.minTop=0,o.maxLeft=a.width-o.width,a.height-o.height))},renderCropBox:function(){var t=this.options,i=this.containerData,e=this.cropBoxData;(e.width>e.maxWidth||e.width<e.minWidth)&&(e.left=e.oldLeft),(e.height>e.maxHeight||e.height<e.minHeight)&&(e.top=e.oldTop),e.width=Math.min(Math.max(e.width,e.minWidth),e.maxWidth),e.height=Math.min(Math.max(e.height,e.minHeight),e.maxHeight),this.limitCropBox(!1,!0),e.left=Math.min(Math.max(e.left,e.minLeft),e.maxLeft),e.top=Math.min(Math.max(e.top,e.minTop),e.maxTop),e.oldLeft=e.left,e.oldTop=e.top,t.movable&&t.cropBoxMovable&&lt(this.face,g,e.width>=i.width&&e.height>=i.height?E:k),nt(this.cropBox,it({width:e.width,height:e.height},Dt({translateX:e.left,translateY:e.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),ft(this.element,a,this.getData())}},Lt={initPreview:function(){var e=this.crossOrigin,t=this.options.preview,a=e?this.crossOriginUrl:this.url,i=document.createElement("img");if(e&&(i.crossOrigin=e),i.src=a,this.viewBox.appendChild(i),this.viewBoxImage=i,t){var n=t;"string"==typeof t?n=this.element.ownerDocument.querySelectorAll(t):t.querySelector&&(n=[t]),tt(this.previews=n,function(t){var i=document.createElement("img");lt(t,u,{width:t.offsetWidth,height:t.offsetHeight,html:t.innerHTML}),e&&(i.crossOrigin=e),i.src=a,i.style.cssText='display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',t.innerHTML="",t.appendChild(i)})}},resetPreview:function(){tt(this.previews,function(t){var i=dt(t,u);nt(t,{width:i.width,height:i.height}),t.innerHTML=i.html,function(i,e){if(G(i[e]))try{delete i[e]}catch(t){i[e]=void 0}else if(i.dataset)try{delete i.dataset[e]}catch(t){i.dataset[e]=void 0}else i.removeAttribute("data-".concat(ct(e)))}(t,u)})},preview:function(){var r=this.imageData,t=this.canvasData,i=this.cropBoxData,s=i.width,c=i.height,d=r.width,l=r.height,p=i.left-t.left-r.left,m=i.top-t.top-r.top;this.cropped&&!this.disabled&&(nt(this.viewBoxImage,it({width:d,height:l},Dt(it({translateX:-p,translateY:-m},r)))),tt(this.previews,function(t){var i=dt(t,u),e=i.width,a=i.height,n=e,o=a,h=1;s&&(o=c*(h=e/s)),c&&a<o&&(n=s*(h=a/c),o=a),nt(t,{width:n,height:o}),nt(t.getElementsByTagName("img")[0],it({width:d*h,height:l*h},Dt(it({translateX:-p*h,translateY:-m*h},r))))}))}},Ot={bind:function(){var t=this.element,i=this.options,e=this.cropper;_(i.cropstart)&&ut(t,x,i.cropstart),_(i.cropmove)&&ut(t,b,i.cropmove),_(i.cropend)&&ut(t,w,i.cropend),_(i.crop)&&ut(t,a,i.crop),_(i.zoom)&&ut(t,j,i.zoom),ut(e,M,this.onCropStart=this.cropStart.bind(this)),i.zoomable&&i.zoomOnWheel&&ut(e,I,this.onWheel=this.wheel.bind(this)),i.toggleDragModeOnDblclick&&ut(e,y,this.onDblclick=this.dblclick.bind(this)),ut(t.ownerDocument,C,this.onCropMove=this.cropMove.bind(this)),ut(t.ownerDocument,D,this.onCropEnd=this.cropEnd.bind(this)),i.responsive&&ut(window,A,this.onResize=this.resize.bind(this))},unbind:function(){var t=this.element,i=this.options,e=this.cropper;_(i.cropstart)&&gt(t,x,i.cropstart),_(i.cropmove)&&gt(t,b,i.cropmove),_(i.cropend)&&gt(t,w,i.cropend),_(i.crop)&&gt(t,a,i.crop),_(i.zoom)&&gt(t,j,i.zoom),gt(e,M,this.onCropStart),i.zoomable&&i.zoomOnWheel&&gt(e,I,this.onWheel),i.toggleDragModeOnDblclick&&gt(e,y,this.onDblclick),gt(t.ownerDocument,C,this.onCropMove),gt(t.ownerDocument,D,this.onCropEnd),i.responsive&&gt(window,A,this.onResize)}},zt={resize:function(){var t=this.options,i=this.container,e=this.containerData,a=Number(t.minContainerWidth)||200,n=Number(t.minContainerHeight)||100;if(!(this.disabled||e.width<=a||e.height<=n)){var o,h,r=i.offsetWidth/e.width;if(1!==r||i.offsetHeight!==e.height)t.restore&&(o=this.getCanvasData(),h=this.getCropBoxData()),this.render(),t.restore&&(this.setCanvasData(tt(o,function(t,i){o[i]=t*r})),this.setCropBoxData(tt(h,function(t,i){h[i]=t*r})))}},dblclick:function(){var t,i;this.disabled||this.options.dragMode===v||this.setDragMode((t=this.dragBox,i=r,(t.classList?t.classList.contains(i):-1<t.className.indexOf(i))?f:c))},wheel:function(t){var i=this,e=Number(this.options.wheelZoomRatio)||.1,a=1;this.disabled||(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(function(){i.wheeling=!1},50),t.deltaY?a=0<t.deltaY?1:-1:t.wheelDelta?a=-t.wheelDelta/120:t.detail&&(a=0<t.detail?1:-1),this.zoom(-a*e,t)))},cropStart:function(t){if(!this.disabled){var i,e=this.options,a=this.pointers;t.changedTouches?tt(t.changedTouches,function(t){a[t.identifier]=Bt(t)}):a[t.pointerId||0]=Bt(t),i=1<Object.keys(a).length&&e.zoomable&&e.zoomOnTouch?W:dt(t.target,g),P.test(i)&&!1!==ft(this.element,x,{originalEvent:t,action:i})&&(t.preventDefault(),this.action=i,this.cropping=!1,i===T&&(this.cropping=!0,ot(this.dragBox,s)))}},cropMove:function(t){var i=this.action;if(!this.disabled&&i){var e=this.pointers;t.preventDefault(),!1!==ft(this.element,b,{originalEvent:t,action:i})&&(t.changedTouches?tt(t.changedTouches,function(t){it(e[t.identifier]||{},Bt(t,!0))}):it(e[t.pointerId||0]||{},Bt(t,!0)),this.change(t))}},cropEnd:function(t){if(!this.disabled){var i=this.action,e=this.pointers;t.changedTouches?tt(t.changedTouches,function(t){delete e[t.identifier]}):delete e[t.pointerId||0],i&&(t.preventDefault(),Object.keys(e).length||(this.action=""),this.cropping&&(this.cropping=!1,rt(this.dragBox,s,this.cropped&&this.options.modal)),ft(this.element,w,{originalEvent:t,action:i}))}}},Yt={change:function(t){var i,e=this.options,a=this.canvasData,n=this.containerData,o=this.cropBoxData,h=this.pointers,r=this.action,s=e.aspectRatio,c=o.left,d=o.top,l=o.width,p=o.height,m=c+l,g=d+p,u=0,f=0,v=n.width,w=n.height,b=!0;!s&&t.shiftKey&&(s=l&&p?l/p:1),this.limited&&(u=o.minLeft,f=o.minTop,v=u+Math.min(n.width,a.width,a.left+a.width),w=f+Math.min(n.height,a.height,a.top+a.height));var x,y,M,C=h[Object.keys(h)[0]],D={x:C.endX-C.startX,y:C.endY-C.startY},B=function(t){switch(t){case N:m+D.x>v&&(D.x=v-m);break;case H:c+D.x<u&&(D.x=u-c);break;case O:d+D.y<f&&(D.y=f-d);break;case L:g+D.y>w&&(D.y=w-g)}};switch(r){case k:c+=D.x,d+=D.y;break;case N:if(0<=D.x&&(v<=m||s&&(d<=f||w<=g))){b=!1;break}B(N),(l+=D.x)<0&&(r=H,c-=l=-l),s&&(p=l/s,d+=(o.height-p)/2);break;case O:if(D.y<=0&&(d<=f||s&&(c<=u||v<=m))){b=!1;break}B(O),p-=D.y,d+=D.y,p<0&&(r=L,d-=p=-p),s&&(l=p*s,c+=(o.width-l)/2);break;case H:if(D.x<=0&&(c<=u||s&&(d<=f||w<=g))){b=!1;break}B(H),l-=D.x,c+=D.x,l<0&&(r=N,c-=l=-l),s&&(p=l/s,d+=(o.height-p)/2);break;case L:if(0<=D.y&&(w<=g||s&&(c<=u||v<=m))){b=!1;break}B(L),(p+=D.y)<0&&(r=O,d-=p=-p),s&&(l=p*s,c+=(o.width-l)/2);break;case z:if(s){if(D.y<=0&&(d<=f||v<=m)){b=!1;break}B(O),p-=D.y,d+=D.y,l=p*s}else B(O),B(N),0<=D.x?m<v?l+=D.x:D.y<=0&&d<=f&&(b=!1):l+=D.x,D.y<=0?f<d&&(p-=D.y,d+=D.y):(p-=D.y,d+=D.y);l<0&&p<0?(r=R,d-=p=-p,c-=l=-l):l<0?(r=Y,c-=l=-l):p<0&&(r=X,d-=p=-p);break;case Y:if(s){if(D.y<=0&&(d<=f||c<=u)){b=!1;break}B(O),p-=D.y,d+=D.y,l=p*s,c+=o.width-l}else B(O),B(H),D.x<=0?u<c?(l-=D.x,c+=D.x):D.y<=0&&d<=f&&(b=!1):(l-=D.x,c+=D.x),D.y<=0?f<d&&(p-=D.y,d+=D.y):(p-=D.y,d+=D.y);l<0&&p<0?(r=X,d-=p=-p,c-=l=-l):l<0?(r=z,c-=l=-l):p<0&&(r=R,d-=p=-p);break;case R:if(s){if(D.x<=0&&(c<=u||w<=g)){b=!1;break}B(H),l-=D.x,c+=D.x,p=l/s}else B(L),B(H),D.x<=0?u<c?(l-=D.x,c+=D.x):0<=D.y&&w<=g&&(b=!1):(l-=D.x,c+=D.x),0<=D.y?g<w&&(p+=D.y):p+=D.y;l<0&&p<0?(r=z,d-=p=-p,c-=l=-l):l<0?(r=X,c-=l=-l):p<0&&(r=Y,d-=p=-p);break;case X:if(s){if(0<=D.x&&(v<=m||w<=g)){b=!1;break}B(N),p=(l+=D.x)/s}else B(L),B(N),0<=D.x?m<v?l+=D.x:0<=D.y&&w<=g&&(b=!1):l+=D.x,0<=D.y?g<w&&(p+=D.y):p+=D.y;l<0&&p<0?(r=Y,d-=p=-p,c-=l=-l):l<0?(r=R,c-=l=-l):p<0&&(r=z,d-=p=-p);break;case E:this.move(D.x,D.y),b=!1;break;case W:this.zoom((y=it({},x=h),M=[],tt(x,function(r,t){delete y[t],tt(y,function(t){var i=Math.abs(r.startX-t.startX),e=Math.abs(r.startY-t.startY),a=Math.abs(r.endX-t.endX),n=Math.abs(r.endY-t.endY),o=Math.sqrt(i*i+e*e),h=(Math.sqrt(a*a+n*n)-o)/o;M.push(h)})}),M.sort(function(t,i){return Math.abs(t)<Math.abs(i)}),M[0]),t),b=!1;break;case T:if(!D.x||!D.y){b=!1;break}i=vt(this.cropper),c=C.startX-i.left,d=C.startY-i.top,l=o.minWidth,p=o.minHeight,0<D.x?r=0<D.y?X:z:D.x<0&&(c-=l,r=0<D.y?R:Y),D.y<0&&(d-=p),this.cropped||(ht(this.cropBox,S),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0))}b&&(o.width=l,o.height=p,o.left=c,o.top=d,this.action=r,this.renderCropBox()),tt(h,function(t){t.startX=t.endX,t.startY=t.endY})}},Xt={crop:function(){return!this.ready||this.cropped||this.disabled||(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&ot(this.dragBox,s),ht(this.cropBox,S),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=it({},this.initialImageData),this.canvasData=it({},this.initialCanvasData),this.cropBoxData=it({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(it(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),ht(this.dragBox,s),ot(this.cropBox,S)),this},replace:function(i){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return!this.disabled&&i&&(this.isImg&&(this.element.src=i),t?(this.url=i,this.image.src=i,this.ready&&(this.viewBoxImage.src=i,tt(this.previews,function(t){t.getElementsByTagName("img")[0].src=i}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(i))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,ht(this.cropper,t)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,ot(this.cropper,t)),this},destroy:function(){var t=this.element;return t[d]&&(t[d]=void 0,this.isImg&&this.replaced&&(t.src=this.originalUrl),this.uncreate()),this},move:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,e=this.canvasData,a=e.left,n=e.top;return this.moveTo(K(t)?t:a+Number(t),K(i)?i:n+Number(i))},moveTo:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,e=this.canvasData,a=!1;return t=Number(t),i=Number(i),this.ready&&!this.disabled&&this.options.movable&&(F(t)&&(e.left=t,a=!0),F(i)&&(e.top=i,a=!0),a&&this.renderCanvas(!0)),this},zoom:function(t,i){var e=this.canvasData;return t=(t=Number(t))<0?1/(1-t):1+t,this.zoomTo(e.width*t/e.naturalWidth,null,i)},zoomTo:function(t,i,e){var a,n,o,h=this.options,r=this.canvasData,s=r.width,c=r.height,d=r.naturalWidth,l=r.naturalHeight;if(0<=(t=Number(t))&&this.ready&&!this.disabled&&h.zoomable){var p=d*t,m=l*t;if(!1===ft(this.element,j,{ratio:t,oldRatio:s/d,originalEvent:e}))return this;if(e){var g=this.pointers,u=vt(this.cropper),f=g&&Object.keys(g).length?(o=n=a=0,tt(g,function(t){var i=t.startX,e=t.startY;a+=i,n+=e,o+=1}),{pageX:a/=o,pageY:n/=o}):{pageX:e.pageX,pageY:e.pageY};r.left-=(p-s)*((f.pageX-u.left-r.left)/s),r.top-=(m-c)*((f.pageY-u.top-r.top)/c)}else J(i)&&F(i.x)&&F(i.y)?(r.left-=(p-s)*((i.x-r.left)/s),r.top-=(m-c)*((i.y-r.top)/c)):(r.left-=(p-s)/2,r.top-=(m-c)/2);r.width=p,r.height=m,this.renderCanvas(!0)}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t))},rotateTo:function(t){return F(t=Number(t))&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=t%360,this.renderCanvas(!0,!0)),this},scaleX:function(t){var i=this.imageData.scaleY;return this.scale(t,F(i)?i:1)},scaleY:function(t){var i=this.imageData.scaleX;return this.scale(F(i)?i:1,t)},scale:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,e=this.imageData,a=!1;return t=Number(t),i=Number(i),this.ready&&!this.disabled&&this.options.scalable&&(F(t)&&(e.scaleX=t,a=!0),F(i)&&(e.scaleY=i,a=!0),a&&this.renderCanvas(!0,!0)),this},getData:function(){var e,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],i=this.options,a=this.imageData,n=this.canvasData,o=this.cropBoxData;if(this.ready&&this.cropped){e={x:o.left-n.left,y:o.top-n.top,width:o.width,height:o.height};var h=a.width/a.naturalWidth;if(tt(e,function(t,i){e[i]=t/h}),t){var r=Math.round(e.y+e.height),s=Math.round(e.x+e.width);e.x=Math.round(e.x),e.y=Math.round(e.y),e.width=s-e.x,e.height=r-e.y}}else e={x:0,y:0,width:0,height:0};return i.rotatable&&(e.rotate=a.rotate||0),i.scalable&&(e.scaleX=a.scaleX||1,e.scaleY=a.scaleY||1),e},setData:function(t){var i=this.options,e=this.imageData,a=this.canvasData,n={};if(this.ready&&!this.disabled&&J(t)){var o=!1;i.rotatable&&F(t.rotate)&&t.rotate!==e.rotate&&(e.rotate=t.rotate,o=!0),i.scalable&&(F(t.scaleX)&&t.scaleX!==e.scaleX&&(e.scaleX=t.scaleX,o=!0),F(t.scaleY)&&t.scaleY!==e.scaleY&&(e.scaleY=t.scaleY,o=!0)),o&&this.renderCanvas(!0,!0);var h=e.width/e.naturalWidth;F(t.x)&&(n.left=t.x*h+a.left),F(t.y)&&(n.top=t.y*h+a.top),F(t.width)&&(n.width=t.width*h),F(t.height)&&(n.height=t.height*h),this.setCropBoxData(n)}return this},getContainerData:function(){return this.ready?it({},this.containerData):{}},getImageData:function(){return this.sized?it({},this.imageData):{}},getCanvasData:function(){var i=this.canvasData,e={};return this.ready&&tt(["left","top","width","height","naturalWidth","naturalHeight"],function(t){e[t]=i[t]}),e},setCanvasData:function(t){var i=this.canvasData,e=i.aspectRatio;return this.ready&&!this.disabled&&J(t)&&(F(t.left)&&(i.left=t.left),F(t.top)&&(i.top=t.top),F(t.width)?(i.width=t.width,i.height=t.width/e):F(t.height)&&(i.height=t.height,i.width=t.height*e),this.renderCanvas(!0)),this},getCropBoxData:function(){var t,i=this.cropBoxData;return this.ready&&this.cropped&&(t={left:i.left,top:i.top,width:i.width,height:i.height}),t||{}},setCropBoxData:function(t){var i,e,a=this.cropBoxData,n=this.options.aspectRatio;return this.ready&&this.cropped&&!this.disabled&&J(t)&&(F(t.left)&&(a.left=t.left),F(t.top)&&(a.top=t.top),F(t.width)&&t.width!==a.width&&(i=!0,a.width=t.width),F(t.height)&&t.height!==a.height&&(e=!0,a.height=t.height),n&&(i?a.height=a.width/n:e&&(a.width=a.height*n)),this.renderCropBox()),this},getCroppedCanvas:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var i,e,a,n,o,h,r,s,c,d,l,p,m,g,u,f,v,w,b,x,y,M,C,D,B,k,T,E,W,N,H,L,O,z,Y,X,R,S,A,I,j,U=this.canvasData,P=(i=this.image,e=this.imageData,a=U,n=t,o=e.aspectRatio,h=e.naturalWidth,r=e.naturalHeight,s=e.rotate,c=void 0===s?0:s,d=e.scaleX,l=void 0===d?1:d,p=e.scaleY,m=void 0===p?1:p,g=a.aspectRatio,u=a.naturalWidth,f=a.naturalHeight,v=n.fillColor,w=void 0===v?"transparent":v,b=n.imageSmoothingEnabled,x=void 0===b||b,y=n.imageSmoothingQuality,M=void 0===y?"low":y,C=n.maxWidth,D=void 0===C?1/0:C,B=n.maxHeight,k=void 0===B?1/0:B,T=n.minWidth,E=void 0===T?0:T,W=n.minHeight,N=void 0===W?0:W,H=document.createElement("canvas"),L=H.getContext("2d"),O=Tt({aspectRatio:g,width:D,height:k}),z=Tt({aspectRatio:g,width:E,height:N},"cover"),Y=Math.min(O.width,Math.max(z.width,u)),X=Math.min(O.height,Math.max(z.height,f)),R=Tt({aspectRatio:o,width:D,height:k}),S=Tt({aspectRatio:o,width:E,height:N},"cover"),A=Math.min(R.width,Math.max(S.width,h)),I=Math.min(R.height,Math.max(S.height,r)),j=[-A/2,-I/2,A,I],H.width=xt(Y),H.height=xt(X),L.fillStyle=w,L.fillRect(0,0,Y,X),L.save(),L.translate(Y/2,X/2),L.rotate(c*Math.PI/180),L.scale(l,m),L.imageSmoothingEnabled=x,L.imageSmoothingQuality=M,L.drawImage.apply(L,[i].concat(bt(j.map(function(t){return Math.floor(xt(t))})))),L.restore(),H);if(!this.cropped)return P;var q=this.getData(),$=q.x,Q=q.y,Z=q.width,F=q.height,K=P.width/Math.floor(U.naturalWidth);1!==K&&($*=K,Q*=K,Z*=K,F*=K);var G=Z/F,V=Tt({aspectRatio:G,width:t.maxWidth||1/0,height:t.maxHeight||1/0}),J=Tt({aspectRatio:G,width:t.minWidth||0,height:t.minHeight||0},"cover"),_=Tt({aspectRatio:G,width:t.width||(1!==K?P.width:Z),height:t.height||(1!==K?P.height:F)}),tt=_.width,it=_.height;tt=Math.min(V.width,Math.max(J.width,tt)),it=Math.min(V.height,Math.max(J.height,it));var et=document.createElement("canvas"),at=et.getContext("2d");et.width=xt(tt),et.height=xt(it),at.fillStyle=t.fillColor||"transparent",at.fillRect(0,0,tt,it);var nt=t.imageSmoothingEnabled,ot=void 0===nt||nt,ht=t.imageSmoothingQuality;at.imageSmoothingEnabled=ot,ht&&(at.imageSmoothingQuality=ht);var rt,st,ct,dt,lt,pt,mt=P.width,gt=P.height,ut=$,ft=Q;ut<=-Z||mt<ut?lt=ct=rt=ut=0:ut<=0?(ct=-ut,ut=0,lt=rt=Math.min(mt,Z+ut)):ut<=mt&&(ct=0,lt=rt=Math.min(Z,mt-ut)),rt<=0||ft<=-F||gt<ft?pt=dt=st=ft=0:ft<=0?(dt=-ft,ft=0,pt=st=Math.min(gt,F+ft)):ft<=gt&&(dt=0,pt=st=Math.min(F,gt-ft));var vt=[ut,ft,rt,st];if(0<lt&&0<pt){var wt=tt/Z;vt.push(ct*wt,dt*wt,lt*wt,pt*wt)}return at.drawImage.apply(at,[P].concat(bt(vt.map(function(t){return Math.floor(xt(t))})))),et},setAspectRatio:function(t){var i=this.options;return this.disabled||K(t)||(i.aspectRatio=Math.max(0,t)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(t){var i=this.options,e=this.dragBox,a=this.face;if(this.ready&&!this.disabled){var n=t===c,o=i.movable&&t===f;t=n||o?t:v,i.dragMode=t,lt(e,g,t),rt(e,r,n),rt(e,m,o),i.cropBoxMovable||(lt(a,g,t),rt(a,r,n),rt(a,m,o))}return this}},Rt=h.Cropper,St=function(){function e(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),!t||!Q.test(t.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,this.options=it({},Z,J(i)&&i),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}var t,i,a;return t=e,a=[{key:"noConflict",value:function(){return window.Cropper=Rt,e}},{key:"setDefaults",value:function(t){it(Z,J(t)&&t)}}],(i=[{key:"init",value:function(){var t,i=this.element,e=i.tagName.toLowerCase();if(!i[d]){if(i[d]=this,"img"===e){if(this.isImg=!0,t=i.getAttribute("src")||"",!(this.originalUrl=t))return;t=i.src}else"canvas"===e&&window.HTMLCanvasElement&&(t=i.toDataURL());this.load(t)}}},{key:"load",value:function(t){var i=this;if(t){this.url=t,this.imageData={};var e=this.element,a=this.options;if(a.rotatable||a.scalable||(a.checkOrientation=!1),a.checkOrientation&&window.ArrayBuffer)if(q.test(t))$.test(t)?this.read((n=t.replace(Wt,""),o=atob(n),h=new ArrayBuffer(o.length),tt(r=new Uint8Array(h),function(t,i){r[i]=o.charCodeAt(i)}),h)):this.clone();else{var n,o,h,r,s=new XMLHttpRequest,c=this.clone.bind(this);this.reloading=!0,(this.xhr=s).ontimeout=c,s.onabort=c,s.onerror=c,s.onprogress=function(){s.getResponseHeader("content-type")!==U&&s.abort()},s.onload=function(){i.read(s.response)},s.onloadend=function(){i.reloading=!1,i.xhr=null},a.checkCrossOrigin&&Mt(t)&&e.crossOrigin&&(t=Ct(t)),s.open("GET",t),s.responseType="arraybuffer",s.withCredentials="use-credentials"===e.crossOrigin,s.send()}else this.clone()}}},{key:"read",value:function(t){var i=this.options,e=this.imageData,a=Nt(t),n=0,o=1,h=1;if(1<a){this.url=function(t,i){for(var e=[],a=new Uint8Array(t);0<a.length;)e.push(Et.apply(void 0,bt(a.subarray(0,8192)))),a=a.subarray(8192);return"data:".concat(i,";base64,").concat(btoa(e.join("")))}(t,U);var r=function(t){var i=0,e=1,a=1;switch(t){case 2:e=-1;break;case 3:i=-180;break;case 4:a=-1;break;case 5:i=90,a=-1;break;case 6:i=90;break;case 7:i=90,e=-1;break;case 8:i=-90}return{rotate:i,scaleX:e,scaleY:a}}(a);n=r.rotate,o=r.scaleX,h=r.scaleY}i.rotatable&&(e.rotate=n),i.scalable&&(e.scaleX=o,e.scaleY=h),this.clone()}},{key:"clone",value:function(){var t,i,e=this.element,a=this.url;this.options.checkCrossOrigin&&Mt(a)&&(i=(t=e.crossOrigin)?a:(t="anonymous",Ct(a))),this.crossOrigin=t,this.crossOriginUrl=i;var n=document.createElement("img");t&&(n.crossOrigin=t),n.src=i||a,(this.image=n).onload=this.start.bind(this),n.onerror=this.stop.bind(this),ot(n,l),e.parentNode.insertBefore(n,e.nextSibling)}},{key:"start",value:function(){var e=this,t=this.isImg?this.element:this.image;t.onload=null,t.onerror=null,this.sizing=!0;var i=h.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(h.navigator.userAgent),a=function(t,i){it(e.imageData,{naturalWidth:t,naturalHeight:i,aspectRatio:t/i}),e.sizing=!1,e.sized=!0,e.build()};if(!t.naturalWidth||i){var n=document.createElement("img"),o=document.body||document.documentElement;(this.sizingImage=n).onload=function(){a(n.width,n.height),i||o.removeChild(n)},n.src=t.src,i||(n.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",o.appendChild(n))}else a(t.naturalWidth,t.naturalHeight)}},{key:"stop",value:function(){var t=this.image;t.onload=null,t.onerror=null,t.parentNode.removeChild(t),this.image=null}},{key:"build",value:function(){if(this.sized&&!this.ready){var t=this.element,i=this.options,e=this.image,a=t.parentNode,n=document.createElement("div");n.innerHTML='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';var o=n.querySelector(".".concat(d,"-container")),h=o.querySelector(".".concat(d,"-canvas")),r=o.querySelector(".".concat(d,"-drag-box")),s=o.querySelector(".".concat(d,"-crop-box")),c=s.querySelector(".".concat(d,"-face"));this.container=a,this.cropper=o,this.canvas=h,this.dragBox=r,this.cropBox=s,this.viewBox=o.querySelector(".".concat(d,"-view-box")),this.face=c,h.appendChild(e),ot(t,S),a.insertBefore(o,t.nextSibling),this.isImg||ht(e,l),this.initPreview(),this.bind(),i.initialAspectRatio=Math.max(0,i.initialAspectRatio)||NaN,i.aspectRatio=Math.max(0,i.aspectRatio)||NaN,i.viewMode=Math.max(0,Math.min(3,Math.round(i.viewMode)))||0,ot(s,S),i.guides||ot(s.getElementsByClassName("".concat(d,"-dashed")),S),i.center||ot(s.getElementsByClassName("".concat(d,"-center")),S),i.background&&ot(o,"".concat(d,"-bg")),i.highlight||ot(c,p),i.cropBoxMovable&&(ot(c,m),lt(c,g,k)),i.cropBoxResizable||(ot(s.getElementsByClassName("".concat(d,"-line")),S),ot(s.getElementsByClassName("".concat(d,"-point")),S)),this.render(),this.ready=!0,this.setDragMode(i.dragMode),i.autoCrop&&this.crop(),this.setData(i.data),_(i.ready)&&ut(t,B,i.ready,{once:!0}),ft(t,B)}}},{key:"unbuild",value:function(){this.ready&&(this.ready=!1,this.unbind(),this.resetPreview(),this.cropper.parentNode.removeChild(this.cropper),ht(this.element,S))}},{key:"uncreate",value:function(){this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?(this.xhr.onabort=null,this.xhr.abort()):this.image&&this.stop()}}])&&n(t.prototype,i),a&&n(t,a),e}();return it(St.prototype,Ht,Lt,Ot,zt,Yt,Xt),St});

/*
* JavaScript Load Image 2.21.0
* https://github.com/blueimp/JavaScript-Load-Image
*
* Copyright 2011, Sebastian Tschan
* https://blueimp.net
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
*/

!function(o){"use strict";function r(t,i,a){var o,n=document.createElement("img");return n.onerror=function(e){return r.onerror(n,e,t,i,a)},n.onload=function(e){return r.onload(n,e,t,i,a)},"string"==typeof t?(r.fetchBlob(t,function(e){e?o=r.createObjectURL(t=e):(o=t,a&&a.crossOrigin&&(n.crossOrigin=a.crossOrigin)),n.src=o},a),n):r.isInstanceOf("Blob",t)||r.isInstanceOf("File",t)?(o=n._objectURL=r.createObjectURL(t))?(n.src=o,n):r.readFile(t,function(e){var t=e.target;t&&t.result?n.src=t.result:i&&i(e)}):void 0}var t=o.createObjectURL&&o||o.URL&&URL.revokeObjectURL&&URL||o.webkitURL&&webkitURL;function n(e,t){!e._objectURL||t&&t.noRevoke||(r.revokeObjectURL(e._objectURL),delete e._objectURL)}r.fetchBlob=function(e,t,i){t()},r.isInstanceOf=function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},r.transform=function(e,t,i,a,o){i(e,o)},r.onerror=function(e,t,i,a,o){n(e,o),a&&a.call(e,t)},r.onload=function(e,t,i,a,o){n(e,o),a&&r.transform(e,o,a,i,{originalWidth:e.naturalWidth||e.width,originalHeight:e.naturalHeight||e.height})},r.createObjectURL=function(e){return!!t&&t.createObjectURL(e)},r.revokeObjectURL=function(e){return!!t&&t.revokeObjectURL(e)},r.readFile=function(e,t,i){if(o.FileReader){var a=new FileReader;if(a.onload=a.onerror=t,a[i=i||"readAsDataURL"])return a[i](e),a}return!1},"function"==typeof define&&define.amd?define(function(){return r}):"object"==typeof module&&module.exports?module.exports=r:o.loadImage=r}("undefined"!=typeof window&&window||this),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image"],e):"object"==typeof module&&module.exports?e(require("./load-image")):e(window.loadImage)}(function(v){"use strict";var n=v.transform;v.transform=function(e,t,i,a,o){n.call(v,v.scale(e,t,o),t,i,a,o)},v.transformCoordinates=function(){},v.getTransformedOptions=function(e,t){var i,a,o,n,r=t.aspectRatio;if(!r)return t;for(a in i={},t)t.hasOwnProperty(a)&&(i[a]=t[a]);return i.crop=!0,r<(o=e.naturalWidth||e.width)/(n=e.naturalHeight||e.height)?(i.maxWidth=n*r,i.maxHeight=n):(i.maxWidth=o,i.maxHeight=o/r),i},v.renderImageToCanvas=function(e,t,i,a,o,n,r,s,l,c){return e.getContext("2d").drawImage(t,i,a,o,n,r,s,l,c),e},v.hasCanvasOption=function(e){return e.canvas||e.crop||!!e.aspectRatio},v.scale=function(e,t,i){t=t||{};var a,o,n,r,s,l,c,d,u,f,g,p=document.createElement("canvas"),h=e.getContext||v.hasCanvasOption(t)&&p.getContext,m=e.naturalWidth||e.width,S=e.naturalHeight||e.height,b=m,y=S;function x(){var e=Math.max((n||b)/b,(r||y)/y);1<e&&(b*=e,y*=e)}function I(){var e=Math.min((a||b)/b,(o||y)/y);e<1&&(b*=e,y*=e)}if(h&&(c=(t=v.getTransformedOptions(e,t,i)).left||0,d=t.top||0,t.sourceWidth?(s=t.sourceWidth,void 0!==t.right&&void 0===t.left&&(c=m-s-t.right)):s=m-c-(t.right||0),t.sourceHeight?(l=t.sourceHeight,void 0!==t.bottom&&void 0===t.top&&(d=S-l-t.bottom)):l=S-d-(t.bottom||0),b=s,y=l),a=t.maxWidth,o=t.maxHeight,n=t.minWidth,r=t.minHeight,h&&a&&o&&t.crop?(g=s/l-(b=a)/(y=o))<0?(l=o*s/a,void 0===t.top&&void 0===t.bottom&&(d=(S-l)/2)):0<g&&(s=a*l/o,void 0===t.left&&void 0===t.right&&(c=(m-s)/2)):((t.contain||t.cover)&&(n=a=a||n,r=o=o||r),t.cover?(I(),x()):(x(),I())),h){if(1<(u=t.pixelRatio)&&(p.style.width=b+"px",p.style.height=y+"px",b*=u,y*=u,p.getContext("2d").scale(u,u)),0<(f=t.downsamplingRatio)&&f<1&&b<s&&y<l)for(;b<s*f;)p.width=s*f,p.height=l*f,v.renderImageToCanvas(p,e,c,d,s,l,0,0,p.width,p.height),d=c=0,s=p.width,l=p.height,(e=document.createElement("canvas")).width=s,e.height=l,v.renderImageToCanvas(e,p,0,0,s,l,0,0,s,l);return p.width=b,p.height=y,v.transformCoordinates(p,t),v.renderImageToCanvas(p,e,c,d,s,l,0,0,b,y)}return e.width=b,e.height=y,e}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image"],e):"object"==typeof module&&module.exports?e(require("./load-image")):e(window.loadImage)}(function(p){"use strict";var e="undefined"!=typeof Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);p.blobSlice=e&&function(){return(this.slice||this.webkitSlice||this.mozSlice).apply(this,arguments)},p.metaDataParsers={jpeg:{65505:[],65517:[]}},p.parseMetaData=function(e,d,u,f){f=f||{};var g=this,t=(u=u||{}).maxMetaDataSize||262144;!!("undefined"!=typeof DataView&&e&&12<=e.size&&"image/jpeg"===e.type&&p.blobSlice)&&p.readFile(p.blobSlice.call(e,0,t),function(e){if(e.target.error)return console.log(e.target.error),void d(f);var t,i,a,o,n=e.target.result,r=new DataView(n),s=2,l=r.byteLength-4,c=s;if(65496===r.getUint16(0)){for(;s<l&&(65504<=(t=r.getUint16(s))&&t<=65519||65534===t);){if(s+(i=r.getUint16(s+2)+2)>r.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(a=p.metaDataParsers.jpeg[t])for(o=0;o<a.length;o+=1)a[o].call(g,r,s,i,f,u);c=s+=i}!u.disableImageHead&&6<c&&(n.slice?f.imageHead=n.slice(0,c):f.imageHead=new Uint8Array(n).subarray(0,c))}else console.log("Invalid JPEG file: Missing JPEG marker.");d(f)},"readAsArrayBuffer")||d(f)},p.hasMetaOption=function(e){return e&&e.meta};var n=p.transform;p.transform=function(t,i,a,o,e){p.hasMetaOption(i)?p.parseMetaData(o,function(e){n.call(p,t,i,a,o,e)},i,e):n.apply(p,arguments)}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(a){"use strict";"undefined"!=typeof fetch&&"undefined"!=typeof Request&&(a.fetchBlob=function(e,t,i){if(a.hasMetaOption(i))return fetch(new Request(e,i)).then(function(e){return e.blob()}).then(t).catch(function(e){console.log(e),t()});t()})}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-scale","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-scale"),require("./load-image-meta")):e(window.loadImage)}(function(l){"use strict";var t=l.hasCanvasOption,i=l.hasMetaOption,c=l.transformCoordinates,s=l.getTransformedOptions;l.hasCanvasOption=function(e){return!!e.orientation||t.call(l,e)},l.hasMetaOption=function(e){return e&&!0===e.orientation||i.call(l,e)},l.transformCoordinates=function(e,t){c.call(l,e,t);var i=e.getContext("2d"),a=e.width,o=e.height,n=e.style.width,r=e.style.height,s=t.orientation;if(s&&!(8<s))switch(4<s&&(e.width=o,e.height=a,e.style.width=r,e.style.height=n),s){case 2:i.translate(a,0),i.scale(-1,1);break;case 3:i.translate(a,o),i.rotate(Math.PI);break;case 4:i.translate(0,o),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-o);break;case 7:i.rotate(.5*Math.PI),i.translate(a,-o),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-a,0)}},l.getTransformedOptions=function(e,t,i){var a,o,n=s.call(l,e,t),r=n.orientation;if(!0===r&&i&&i.exif&&(r=i.exif.get("Orientation")),!r||8<r||1===r)return n;for(o in a={},n)n.hasOwnProperty(o)&&(a[o]=n[o]);switch(a.orientation=r){case 2:a.left=n.right,a.right=n.left;break;case 3:a.left=n.right,a.top=n.bottom,a.right=n.left,a.bottom=n.top;break;case 4:a.top=n.bottom,a.bottom=n.top;break;case 5:a.left=n.top,a.top=n.left,a.right=n.bottom,a.bottom=n.right;break;case 6:a.left=n.top,a.top=n.right,a.right=n.bottom,a.bottom=n.left;break;case 7:a.left=n.bottom,a.top=n.right,a.right=n.top,a.bottom=n.left;break;case 8:a.left=n.bottom,a.top=n.left,a.right=n.top,a.bottom=n.right}return 4<a.orientation&&(a.maxWidth=n.maxHeight,a.maxHeight=n.maxWidth,a.minWidth=n.minHeight,a.minHeight=n.minWidth,a.sourceWidth=n.sourceHeight,a.sourceHeight=n.sourceWidth),a}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(g){"use strict";g.ExifMap=function(){return this},g.ExifMap.prototype.map={Orientation:274},g.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},g.getExifThumbnail=function(e,t,i){if(i&&!(t+i>e.byteLength))return g.createObjectURL(new Blob([e.buffer.slice(t,t+i)]));console.log("Invalid Exif data: Invalid thumbnail data.")},g.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},g.exifTagTypes[7]=g.exifTagTypes[1],g.getExifValue=function(e,t,i,a,o,n){var r,s,l,c,d,u,f=g.exifTagTypes[a];if(f){if(!((s=4<(r=f.size*o)?t+e.getUint32(i+8,n):i+8)+r>e.byteLength)){if(1===o)return f.getValue(e,s,n);for(l=[],c=0;c<o;c+=1)l[c]=f.getValue(e,s+c*f.size,n);if(f.ascii){for(d="",c=0;c<l.length&&"\0"!==(u=l[c]);c+=1)d+=u;return d}return l}console.log("Invalid Exif data: Invalid data offset.")}else console.log("Invalid Exif data: Invalid tag type.")},g.parseExifTag=function(e,t,i,a,o){var n=e.getUint16(i,a);o.exif[n]=g.getExifValue(e,t,i,e.getUint16(i+2,a),e.getUint32(i+4,a),a)},g.parseExifTags=function(e,t,i,a,o){var n,r,s;if(i+6>e.byteLength)console.log("Invalid Exif data: Invalid directory offset.");else{if(!((r=i+2+12*(n=e.getUint16(i,a)))+4>e.byteLength)){for(s=0;s<n;s+=1)this.parseExifTag(e,t,i+2+12*s,a,o);return e.getUint32(r,a)}console.log("Invalid Exif data: Invalid directory size.")}},g.parseExifData=function(e,t,i,a,o){if(!o.disableExif){var n,r,s,l=t+10;if(1165519206===e.getUint32(t+4))if(l+8>e.byteLength)console.log("Invalid Exif data: Invalid segment size.");else if(0===e.getUint16(t+8)){switch(e.getUint16(l)){case 18761:n=!0;break;case 19789:n=!1;break;default:return void console.log("Invalid Exif data: Invalid byte alignment marker.")}42===e.getUint16(l+2,n)?(r=e.getUint32(l+4,n),a.exif=new g.ExifMap,(r=g.parseExifTags(e,l,l+r,n,a))&&!o.disableExifThumbnail&&(s={exif:{}},r=g.parseExifTags(e,l,l+r,n,s),s.exif[513]&&(a.exif.Thumbnail=g.getExifThumbnail(e,l+s.exif[513],s.exif[514]))),a.exif[34665]&&!o.disableExifSub&&g.parseExifTags(e,l,l+a.exif[34665],n,a),a.exif[34853]&&!o.disableExifGps&&g.parseExifTags(e,l,l+a.exif[34853],n,a)):console.log("Invalid Exif data: Missing TIFF marker.")}else console.log("Invalid Exif data: Missing byte alignment offset.")}},g.metaDataParsers.jpeg[65505].push(g.parseExifData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-exif"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-exif")):e(window.loadImage)}(function(e){"use strict";e.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},e.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},e.ExifMap.prototype.getText=function(e){var t=this.get(e);switch(e){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[e][t];case"ExifVersion":case"FlashpixVersion":if(!t)return;return String.fromCharCode(t[0],t[1],t[2],t[3]);case"ComponentsConfiguration":if(!t)return;return this.stringValues[e][t[0]]+this.stringValues[e][t[1]]+this.stringValues[e][t[2]]+this.stringValues[e][t[3]];case"GPSVersionID":if(!t)return;return t[0]+"."+t[1]+"."+t[2]+"."+t[3]}return String(t)},function(e){var t,i=e.tags,a=e.map;for(t in i)i.hasOwnProperty(t)&&(a[i[t]]=t)}(e.ExifMap.prototype),e.ExifMap.prototype.getAll=function(){var e,t,i={};for(e in this)this.hasOwnProperty(e)&&(t=this.tags[e])&&(i[t]=this.getText(t));return i}}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-meta"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-meta")):e(window.loadImage)}(function(u){"use strict";u.IptcMap=function(){return this},u.IptcMap.prototype.map={ObjectName:5},u.IptcMap.prototype.get=function(e){return this[e]||this[this.map[e]]},u.parseIptcTags=function(e,t,i,a){function o(e,t,i){for(var a="",o=t;o<t+i;o++)a+=String.fromCharCode(e.getUint8(o));return a}for(var n,r,s,l=t;l<t+i;)28===e.getUint8(l)&&2===e.getUint8(l+1)&&(s=e.getUint8(l+2))in a.iptc.tags&&(r=e.getInt16(l+3),n=o(e,l+5,r),a.iptc.hasOwnProperty(s)?a.iptc[s]instanceof Array?a.iptc[s].push(n):a.iptc[s]=[a.iptc[s],n]:a.iptc[s]=n),l++},u.parseIptcData=function(e,t,i,a,o){if(!o.disableIptc){for(var n,r,s=t+i;t+8<s;){if(r=t,943868237===(n=e).getUint32(r)&&1028===n.getUint16(r+4)){var l=e.getUint8(t+7);l%2!=0&&(l+=1),0===l&&(l=4);var c=t+8+l;if(s<c){console.log("Invalid IPTC data: Invalid segment offset.");break}var d=e.getUint16(t+6+l);if(s<t+d){console.log("Invalid IPTC data: Invalid segment size.");break}return a.iptc=new u.IptcMap,u.parseIptcTags(e,c,d,a)}t++}console.log("No IPTC data at this offset - could be XMP")}},u.metaDataParsers.jpeg[65517].push(u.parseIptcData)}),function(e){"use strict";"function"==typeof define&&define.amd?define(["./load-image","./load-image-iptc"],e):"object"==typeof module&&module.exports?e(require("./load-image"),require("./load-image-iptc")):e(window.loadImage)}(function(e){"use strict";e.IptcMap.prototype.tags={3:"ObjectType",4:"ObjectAttribute",5:"ObjectName",7:"EditStatus",8:"EditorialUpdate",10:"Urgency",12:"SubjectRef",15:"Category",20:"SupplCategory",22:"FixtureID",25:"Keywords",26:"ContentLocCode",27:"ContentLocName",30:"ReleaseDate",35:"ReleaseTime",37:"ExpirationDate",38:"ExpirationTime",40:"SpecialInstructions",42:"ActionAdvised",45:"RefService",47:"RefDate",50:"RefNumber",55:"DateCreated",60:"TimeCreated",62:"DigitalCreationDate",63:"DigitalCreationTime",65:"OriginatingProgram",70:"ProgramVersion",75:"ObjectCycle",80:"Byline",85:"BylineTitle",90:"City",92:"Sublocation",95:"State",100:"CountryCode",101:"CountryName",103:"OrigTransRef",105:"Headline",110:"Credit",115:"Source",116:"CopyrightNotice",118:"Contact",120:"Caption",122:"WriterEditor",130:"ImageType",131:"ImageOrientation",135:"LanguageID"},e.IptcMap.prototype.getText=function(e){var t=this.get(e);return String(t)},function(e){var t,i=e.tags,a=e.map||{};for(t in i)i.hasOwnProperty(t)&&(a[i[t]]=t)}(e.IptcMap.prototype),e.IptcMap.prototype.getAll=function(){var e,t,i={};for(e in this)this.hasOwnProperty(e)&&(t=this.tags[e])&&(i[t]=this.getText(t));return i}});

/*! Mega pixel image rendering library for iOS6 Safari | Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com> | MIT license | https://github.com/stomita/ios-imagefile-megapixel */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(m(){m 1z(j){9 p=j.M,n=j.N;f(p*n>14*14){9 e=O.P(\'e\');e.a=e.b=1;9 c=e.Q(\'R\');c.S(j,-p+1,0);s c.1h(0,0,1,1).T[3]===0}t{s 1i}}m 1A(j,p,n){9 e=O.P(\'e\');e.a=1;e.b=n;9 c=e.Q(\'R\');c.S(j,0,0);9 T=c.1h(0,0,1,n).T;9 r=0;9 15=n;9 u=n;16(u>r){9 1j=T[(u-1)*4+3];f(1j===0){15=u}t{r=u}u=(15+r)>>1}9 17=(u/n);s(17===0)?1:17}m 1k(j,h,y){9 e=O.P(\'e\');18(j,e,h,y);s e.1B("1l/1m",h.1C||0.8)}m 18(j,e,h,y){9 p=j.M,n=j.N;f(!(p+n))s;9 a=h.a,b=h.b;9 c=e.Q(\'R\');c.1D();1n(e,c,a,b,h.U);9 1o=1i;f(1o){p/=2;n/=2}9 d=14;9 z=O.P(\'e\');z.a=z.b=d;9 V=z.Q(\'R\');9 1p=1;9 19=v.1q(d*a/p);9 1a=v.1q(d*b/n/1p);9 r=0;9 1b=0;16(r<n){9 W=0;9 1c=0;16(W<p){V.1E(0,0,d,d);V.S(j,-W,-r);c.S(z,0,0,d,d,1c,1b,19,1a);W+=d;1c+=19}r+=d;1b+=1a}c.1F();z=V=X}m 1n(e,c,a,b,U){1r(U){o 5:o 6:o 7:o 8:e.a=b;e.b=a;q;1s:e.a=a;e.b=b}1r(U){o 2:c.A(a,0);c.Y(-1,1);q;o 3:c.A(a,b);c.G(v.H);q;o 4:c.A(0,b);c.Y(1,-1);q;o 5:c.G(0.5*v.H);c.Y(1,-1);q;o 6:c.G(0.5*v.H);c.A(0,-b);q;o 7:c.G(0.5*v.H);c.A(a,-b);c.Y(-1,1);q;o 8:c.G(-0.5*v.H);c.A(-a,0);q;1s:q}}9 w=x.w&&x.w.Z?x.w:x.1d&&x.1d.Z?x.1d:X;m B(l){f(x.1t&&l 1G 1t){f(!w){1H 1I("1J Z m 1K 1L 1M C 1N");}9 j=1O 1P();j.1e=w.Z(l);g.C=l;l=j}f(!l.M&&!l.N){9 I=g;l.1Q=l.1R=m(){9 10=I.J;f(10){I.J=X;1u(9 i=0,1v=10.1S;i<1v;i++){10[i]()}}};g.J=[]}g.l=l}B.1T.1w=m(D,h,11){f(g.J){9 I=g;g.J.1U(m(){I.1w(D,h,11)});s}h=h||{};9 E=g.l.M,F=g.l.N,a=h.a,b=h.b,K=h.K,L=h.L,y=!g.C||g.C.1V===\'1l/1m\';f(a&&!b){b=(F*a/E)<<0}t f(b&&!a){a=(E*b/F)<<0}t{a=E;b=F}f(K&&a>K){a=K;b=(F*a/E)<<0}f(L&&b>L){b=L;a=(E*b/F)<<0}9 12={a:a,b:b};1u(9 k 1W h)12[k]=h[k];9 13=D.13.1X();f(13===\'j\'){D.1e=1k(g.l,12,y)}t f(13===\'e\'){18(g.l,D,12,y)}f(1f g.1x===\'m\'){g.1x(D)}f(11){11()}f(g.C){g.C=X;w.1Y(g.l.1e)}};f(1f 1g===\'m\'&&1g.1Z){1g([],m(){s B})}t f(1f 1y===\'20\'){21.1y=B}t{g.B=B}})();',62,126,'|||||||||var|width|height|ctx||canvas|if|this|options||img||srcImage|function|ih|case|iw|break|sy|return|else|py|Math|URL|window|doSquash|tmpCanvas|translate|MegaPixImage|blob|target|imgWidth|imgHeight|rotate|PI|_this|imageLoadListeners|maxWidth|maxHeight|naturalWidth|naturalHeight|document|createElement|getContext|2d|drawImage|data|orientation|tmpCtx|sx|null|scale|createObjectURL|listeners|callback|opt|tagName|1024|ey|while|ratio|renderImageToCanvas|dw|dh|dy|dx|webkitURL|src|typeof|define|getImageData|false|alpha|renderImageToDataURL|image|jpeg|transformCoordinate|subsampled|vertSquashRatio|ceil|switch|default|Blob|for|len|render|onrender|exports|detectSubsampling|detectVerticalSquash|toDataURL|quality|save|clearRect|restore|instanceof|throw|Error|No|found|to|create|url|new|Image|onload|onerror|length|prototype|push|type|in|toLowerCase|revokeObjectURL|amd|object|module'.split('|'),0,{}));
