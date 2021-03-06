//== 代码自动生成
var mGeneration = function () {
    /**
     * 是否是跳转到指定页进入的回调
     *
     * @type {boolean}
     */
    var isGoTo = false;
    /**
     * 表单向导
     */
    var wizard;
    /**
     * 查询条件的排序
     */
    var searchOrder = [];
    /**
     * 列表的排序
     */
    var listOrder = [];
    /**
     * 录入页面的排序
     */
    var inputOrder = [];
    /**
     * 隐藏的字段
     */
    var hideProperty = [];
    /**
     * 初始化表单向导
     */
    var initWizard = function () {
        //== 初始化
        wizard = new KTWizard('m_wizard', {
            startStep: 1
        });

        //== 下一步
        wizard.on('beforeNext', function (wizardObj) {
            if (!isGoTo) {
                var listSwitch = $('[name="listSwitch"]').prop('checked');
                var inputSwitch = $('[name="inputSwitch"]').prop('checked');
                if (wizardObj.currentStep === 1) {
                    // 保存最近使用的路径
                    generationTool.setLatelyPath();
                } else if (wizardObj.currentStep === 2) {
                    // 第二步点击下一步的时候要检查有无必要配置 [	字段信息] [list 页面布局] [input 页面布局]
                    if (!listSwitch && !inputSwitch) {
                        isGoTo = true;
                        wizard.goTo(6);
                        wizardObj.stop();
                    }
                } else if (wizardObj.currentStep === 3) {
                    // 每次从第三步[字段信息]点下一步重新获取配置,防止修改
                    generationTool.fieldConfig = generationTool.getFieldConfig();
                    // 第三步点击下一步的时候要检查有无必要配置 [list 页面布局] [input 页面布局]
                    if (!listSwitch && !inputSwitch) {
                        isGoTo = true;
                        wizard.goTo(6);
                        wizardObj.stop();
                    } else if (!listSwitch && inputSwitch) {
                        isGoTo = true;
                        wizard.goTo(5);
                        wizardObj.stop();
                    }
                } else if (wizardObj.currentStep === 4) {
                    // 第四步点击下一步的时候要检查有无必要配置[input 页面布局]
                    if (!inputSwitch) {
                        isGoTo = true;
                        wizard.goTo(6);
                        wizardObj.stop();
                    }
                }
                var needValid = $('#m_wizard_form_step_' + wizardObj.currentStep).find('input,select');
                if (needValid.length > 0) {
                    if (!needValid.valid()) {
                        // 表单验证失败 不跳转到下一步
                        wizardObj.stop();
                    }
                }
            } else {
                return true;
            }
        });
        //== 上一步
        wizard.on('beforePrev', function (wizardObj) {
            if (!isGoTo) {
                var listSwitch = $('[name="listSwitch"]').prop('checked');
                var inputSwitch = $('[name="inputSwitch"]').prop('checked');
                if (wizardObj.currentStep === 6) {
                    if (!listSwitch && !inputSwitch) {
                        // 如果不用生成list/input直接返回第2步
                        isGoTo = true;
                        wizard.goTo(2);
                        wizardObj.stop();
                    } else if (listSwitch && !inputSwitch) {
                        isGoTo = true;
                        wizard.goTo(4);
                        wizardObj.stop();
                    }
                } else if (wizardObj.currentStep === 5) {
                    // 如果不用生成list.html,则跳过第4步
                    if (!listSwitch) {
                        isGoTo = true;
                        wizard.goTo(3);
                        wizardObj.stop();
                    }
                }
            } else {
                return true;
            }
        });
        //== change事件
        wizard.on('change', function (wizardObj) {
            isGoTo = false;
            // 每次切换,页面回到顶部
            KTUtil.scrollTop();
            if (wizardObj.currentStep === 3) {
                var $scrollable = $('#field-set-scrollable');
                if(!$scrollable.hasClass('ps')){
                    var viewPort = KTUtil.getViewPort();
                    KTUtil.scrollInit($scrollable[0], {
                        height: viewPort.height - 350
                    });
                }
            }
            if (wizardObj.currentStep === 4) {
                initStepList();
            }
            if (wizardObj.currentStep === 5) {
                initStepInput();
            }
            if (wizardObj.currentStep === 6) {
                initGenerationFilePath();
            }
        });
    };
    /**
     * 初始化提交
     */
    var initSubmit = function () {
        var btn = $('#kt_form').find('[data-ktwizard-type="action-submit"]');
        btn.on('click', function (e) {
            e.preventDefault();

            /**
             * 获取数据
             *
             * @return {object}
             */
            function getData() {
                var data = {};
                $('.kt-wizard-v3__content:eq(0) input, .kt-wizard-v3__content:eq(0) select, ' +
                    '.kt-wizard-v3__content:eq(1) input, .kt-wizard-v3__content:eq(1) select, ' +
                    '[name="replace"]').each(function (index, element) {
                    var $element = $(element);
                    if (KTUtil.isNotBlank($element.attr('name'))) {
                        if ('checkbox' === $element.attr('type')) {
                            data[$element.attr('name')] = $element.prop('checked');
                        } else {
                            data[$element.attr('name')] = $element.val();
                        }
                    }
                });
                data.fieldSets = generationTool.fieldConfig;
                data.searchOrder = searchOrder;
                data.listOrder = listOrder;
                data.inputOrder = hideProperty.concat(inputOrder);
                return data;
            }

            var $btn = $(this);
            var data = getData();
            console.log(data);
            KTUtil.setButtonWait($btn);
            KTUtil.ajax({
                url: KTTool.getBaseUrl() + 'generate',
                data: JSON.stringify(data),
                contentType: 'application/json',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    KTUtil.offButtonWait($btn);
                    KTUtil.ajaxError(XMLHttpRequest, textStatus, errorThrown);
                },
                fail: function (res) {
                    KTUtil.offButtonWait($btn);
                    KTTool.warnTip(KTTool.commonTips.fail, res.message);
                },
                success: function (res) {
                    KTUtil.offButtonWait($btn);
                    KTTool.successTip(KTTool.commonTips.success, '文件生成成功');
                }
            });
        });
    };
    /**
     * 加载数据源
     */
    var dataSourceChange = function () {
        var dataSource = $('#dataSource').val();
        if (KTUtil.isNotBlank(dataSource)) {
            initTableSelect(dataSource);
        } else {
            $('#tableName').empty().selectpicker();
        }
    };
    /**
     * 加载表
     *
     * @param dataSourceCode 数据源
     */
    var initTableSelect = function (dataSourceCode) {
        var tableName = $('#tableName').empty();
        tableName.append('<option value="">&nbsp;</option>');
        KTUtil.ajax({
            url: KTTool.getBaseUrl() + 'select/table',
            data: {
                dataSourceCode: dataSourceCode
            },
            success: function (res) {
                if (KTUtil.isArray(res.data) && res.data.length > 0) {
                    $(res.data).each(function (index, obj) {
                        tableName.append('<option data-subtext="' + obj.text + '" value="' + obj.value + '">' +
                            obj.value + '</option>');
                    });
                    tableName.selectpicker('refresh').change(function () {
                        tableChange();
                    });
                }
            }
        });
    };
    /**
     * 表名改变事件
     * 自动生成表单中的默认值
     */
    var tableChange = function () {
        /**
         * 加载列设置
         * @param tableName {string} 表名
         */
        var loadFieldSet = function (tableName) {
            /**
             * 获取当前 field 配置
             * @param index {number} 序号
             * @param field {object} 列配置
             * @return {string} html
             */
            var getConfigRow = function (index, field) {
                return '<tr data-name="' + field['name'] + '" data-property-name="' + field['propertyName'] + '">\
                    <td class="cell-base kt--padding-top-15">' + (index + 1) + '</td>\
                    <td class="cell-base kt--padding-top-15"><input type="hidden" name="columnName" value="' + field['name'] + '" />' + (field['keyFlag'] ? '<i class="text-info la la-key"></i>' : '') + field['name'] + '</td>\
                    <td class="cell-base kt--padding-top-15">' + field['type'] + '</td>\
                    <td class="cell-base kt--padding-top-15"><div title="' + field['comment'] + '" class="ell" style="max-width: 140px;">' + field['comment'] + '<span/></td>\
                    <td class="cell-base kt--padding-top-15">' + field['propertyName'] + '</td>\
                    <td class="cell-base kt--padding-top-15"><input type="hidden" name="propertyType" value="' + field['propertyType'] + '">' + field['propertyType'] + '</td>\
                    <td class="border-left cell-list">' + generationTool.getCheckbox('showInList', generationTool.getCheckStatusByPreferenceSetting(field['propertyName'], preferenceSetting.list.exclude)) + '</td>\
                    <td class="cell-list">' + generationTool.getInput('title', field['comment']) + '</td>\
                    <td class="cell-list">' + generationTool.getCheckbox('showInSearch', generationTool.getCheckStatusByPreferenceSetting(field['propertyName'], preferenceSetting.list.excludeSearch)) + '</td>\
                    <td class="cell-list">' + generationTool.getDictSelect('matchingMode', 'matchingMode', generationTool.getDefaultDictByPreferenceSetting(field['propertyName'], preferenceSetting.list.matching, 'eq')) + '</td>\
                    <td class="cell-input">' + generationTool.getDictSelect('grid', 'listGrid', '4/4/8') + '</td>\
                    <td class="border-left cell-input">' + generationTool.getCheckbox('showInInput', generationTool.getCheckStatusByPreferenceSetting(field['propertyName'], preferenceSetting.input.exclude)) + '</td>\
                    <td class="cell-input">' + generationTool.getInput('label', field['comment']) + '</td>\
                    <td class="cell-input">' + generationTool.getDictSelect('elementType', 'elementType', generationTool.getDefaultDictByPreferenceSetting(field['propertyName'], preferenceSetting.input.type, 'text', field['propertyType'])) + '</td>\
                    <td class="cell-input">' + generationTool.getDictSelect('grid', 'inputGrid', '6/4/8') + '</td>\
                    <td class="cell-input">\
                        <select class="form-control kt-bootstrap-select select-picker"\
                                name="dictType" data-live-search="true">' + generationTool.getDictTypeOption(field['name']) + '\
                        </select>\
                    </td>\
                    <td class="cell-input">' + generationTool.getCheckbox('required', '') + '</td>\
                    <td class="cell-input">' + generationTool.getDictSelect('verification', 'validate', '') + '</td>\
                </tr>'
            };
            KTUtil.ajax({
                url: KTTool.getBaseUrl() + 'select/fields',
                data: {
                    tableName: tableName
                },
                success: function (res) {
                    var fieldSet = $('#field-set > tbody');
                    $(res.data.fields).each(function (index, field) {
                        fieldSet.append(getConfigRow(index, field));
                    });
                    KTApp.initSelectPicker(fieldSet.find('[data-dict-type], .select-picker'));
                }
            });
        };
        // 重置表单
        generationTool.resetForm();
        var checkedOption = $('#tableName > :checked');
        var tableName = checkedOption.attr('value');
        var tableComment = checkedOption.data('subtext');
        if (KTUtil.isNotBlank(tableName)) {
            if (KTUtil.isNotBlank(tableComment)) {
                $('#businessName, #menuName').val(tableComment);
            }
            $('#module').val(generationTool.getModule(tableName)).trigger("change");
            $('#modelName').val(generationTool.getModelName(tableName));
            $('#controllerMapping').val(generationTool.getControllerMapping(tableName));
            $('#viewPath').val(generationTool.getControllerMapping(tableName));
            $('#permissionsCode').val(generationTool.getPermissionsCode(tableName));
        }
        loadFieldSet(tableName);
    };
    /**
     * 删除未勾选项
     *
     * @param configs {object} 用户设置
     * @param content {object} 查找范围
     * @param array {array} 查询条件/表格/input顺序
     * @return array 查询条件/表格/input顺序
     */
    var deleteUnCheckElement = function (configs, content, array) {
        var checkHav = function (configs, propertyName) {
            var hav = false;
            $(configs).each(function (index, config) {
                if (config.propertyName === propertyName) {
                    hav = true;
                    return;
                }
            });
            return hav;
        };
        var elements = $(content).find('[data-property-name]');
        if (typeof elements !== 'undefined' && elements.length > 0) {
            $(elements).each(function (index, element) {
                element = $(element);
                if (!checkHav(configs, element.data('property-name'))) {
                    array.splice(array.indexOf(element.data('property-name')), 1);
                    element.remove();
                }
            });
        }
        return array;
    };
    /**
     * 设置输入框
     *
     * @param configs {array} 用户设置
     * @param content {object} 容器
     * @param array {array} 字段顺序
     * @param type {string} list/input
     */
    var initInput = function (configs, content, array, type) {
        if (configs.length > 0) {
            if ('input' === type) {
                hideProperty = [];
            }
            $(configs).each(function (index, config) {
                if (config.elementType !== 'hidden') {
                    // 通过propertyName属性检查是不是已经放到页面中
                    var propertyName = content.find('[data-property-name="' + config.propertyName + '"]');
                    if (propertyName.length === 0) {
                        // 没有添加到对应位置
                        content.append(generationTool.generationInput(config, type));
                        array.push(config.propertyName);
                    } else {
                        // 更新内容, 因为内容可能发生改变
                        propertyName.find('.form-group').html(generationTool.generationContent(config, type));
                        // 更新gridClass
                        if ('list' === type) {
                            propertyName.removeClass('size-1 size-2 size-3 size-4').addClass(generationTool.getGridClass(config.listGrid));
                        } else {
                            propertyName.removeClass('size-1 size-2 size-3 size-4').addClass(generationTool.getGridClass(config.inputGrid));
                        }
                    }
                } else {
                    if ('input' === type) {
                        hideProperty.push(config.propertyName);
                    }
                }
            });
        }
        return array;
    };
    /**
     * 初始化list页面
     */
    var initStepList = function () {
        /**
         * 初始化查询条件
         */
        var initSearch = function () {
            generationTool.generationSearchClass();
            var configs = generationTool.selectFieldConfig('showInSearch');
            var searchBody = $('#search-body');
            searchOrder = initInput(configs, searchBody, searchOrder, 'list');
            searchOrder = deleteUnCheckElement(configs, searchBody, searchOrder);
            searchBody.gridly({
                base: Math.floor(searchBody.width() / 12) - generationTool.gutter,
                gutter: generationTool.gutter,
                columns: 12,
                callbacks: {
                    reordered: function ($elements) {
                        // console.log($elements);
                        searchOrder = generationTool.getOrderPropertyName($elements);
                    }
                }
            });
        };
        /**
         * 初始化表格
         */
        var initTable = function () {
            generationTool.generationTableClass();
            var configs = generationTool.selectFieldConfig('showInList');
            var listBody = $('#list-body');
            if (configs.length > 0) {
                $(configs).each(function (index, config) {
                    // 通过propertyName属性检查是不是已经放到页面中
                    var propertyName = listBody.find('[data-property-name="' + config.propertyName + '"]');
                    if (propertyName.length === 0) {
                        // 没有添加到对应位置
                        listBody.append('<div data-property-name="' + config.propertyName + '" class="brick size-1">' + config.title + '</div> ');
                        listOrder.push(config.propertyName);
                    } else {
                        // 更新label, label可能发生改变
                        propertyName.html(config.title);
                    }
                });
            }
            listOrder = deleteUnCheckElement(configs, listBody, listOrder);
            listBody.gridly({
                base: Math.floor(listBody.width() / 12) - generationTool.gutter,
                gutter: generationTool.gutter,
                columns: 12,
                callbacks: {
                    reordered: function ($elements) {
                        listOrder = generationTool.getOrderPropertyName($elements);
                    }
                }
            });
        };
        $('.business-name').html($('#businessName').val());
        initSearch();
        initTable();
    };
    /**
     * 初始化input页面
     */
    var initStepInput = function () {
        generationTool.generationInputClass();
        $('.business-name').html($('#businessName').val());
        var configs = generationTool.selectFieldConfig('showInInput');
        var inputBody = $('#input-body');
        inputOrder = initInput(configs, inputBody, inputOrder, 'input');
        inputOrder = deleteUnCheckElement(configs, inputBody, inputOrder);
        inputBody.gridly({
            base: inputBody.width() / 12 - generationTool.gutter,
            gutter: generationTool.gutter,
            columns: 12,
            callbacks: {
                reordered: function ($elements) {
                    // console.log($elements);
                    inputOrder = generationTool.getOrderPropertyName($elements);
                }
            }
        });
    };
    /**
     * 初始化生成文件路径
     */
    var initGenerationFilePath = function () {
        /**
         * 检查check是否选中
         *
         * @param name {string} 元素name
         * @return {boolean}
         */
        function checkIsChecked(name) {
            return $('[name="' + name + '"]').prop('checked');
        }

        var generationFile = $('#generation-file > .kt-list-timeline__items');
        generationFile.empty();
        if (checkIsChecked('modelSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-java"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('model') + '</span>\
                </div>');
        }
        if (checkIsChecked('daoSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-java"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('dao') + '</span>\
                </div>');
        }
        if (checkIsChecked('mappingSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fa fa-file-excel"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('mapping') + '</span>\
                </div>');
        }
        if (checkIsChecked('serviceSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-java"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('service') + '</span>\
                </div>');
        }
        if (checkIsChecked('serviceImplSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-java"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('serviceImpl') + '</span>\
                </div>');
        }
        if (checkIsChecked('controllerSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-java"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('controller') + '</span>\
                </div>');
        }
        if (checkIsChecked('listSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-html5"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('list.html') + '</span>\
                </div>');
        }
        if (checkIsChecked('listJsSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-js-square"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('list.js') + '</span>\
                </div>');
        }
        if (checkIsChecked('inputSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-html5"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('input.html') + '</span>\
                </div>');
        }
        if (checkIsChecked('inputJsSwitch')) {
            generationFile.append('<div class="kt-list-timeline__item">\
                    <span class="kt-list-timeline__badge"></span>\
                    <span class="kt-list-timeline__icon fab fa-js-square"></span>\
                    <span class="kt-list-timeline__text">' + generationTool.getFilePath('input.js') + '</span>\
                </div>');
        }
    };

    return {
        //== public functions
        /**
         * 初始化页面
         */
        init: function () {
            KTTool.setBaseUrl(basePath + '/auth/generation/');
            $('#dataSource').change(function () {
                dataSourceChange();
            });
            $('#tableName').html('<option value="">请先选择数据源</option>').selectpicker();
            initWizard();
            initSubmit();
            generationTool.setDefault();
            generationTool.initGeneratorTemplate();
            generationTool.initDictType();
        }
    };
}();
//== 初始化
$(document).ready(function () {
    mGeneration.init();
});