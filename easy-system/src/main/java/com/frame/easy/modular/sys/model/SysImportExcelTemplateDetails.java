package com.frame.easy.modular.sys.model;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.frame.easy.base.model.IModel;
import com.frame.easy.common.page.Page;
import com.frame.easy.util.office.ImportExportUtil;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * 导入模板详情
 *
 * @author TengChong
 * @date 2019-04-10
 */
@TableName("sys_import_excel_template_details")
public class SysImportExcelTemplateDetails extends Model<SysImportExcelTemplateDetails> implements IModel, Serializable {
    private static final long serialVersionUID = 1L;

    @TableId(value = "id")
    private String id;

    /**
     * 模板id
     */
    @NotNull(message = "模板id不能为空")
    private String templateId;

    /**
     * 数据库字段名
     */
    @NotBlank(message = "数据库字段名不能为空")
    private String fieldName;

    /**
     * 标题
     */
    @NotBlank(message = "标题不能为空")
    private String title;

    /**
     * 字段长度
     */
    private String fieldLength;

    /**
     * 字段类型
     */
    @NotBlank(message = "字段类型不能为空")
    private String fieldType;

    /**
     * 替换表
     */
    private String replaceTable;

    /**
     * 替换表-名称
     */
    private String replaceTableFieldName;

    /**
     * 替换表-值
     */
    private String replaceTableFieldValue;

    /**
     * 替换表-字典类型
     */
    private String replaceTableDictType;

    /**
     * 排序值
     */
    @NotNull(message = "排序值不能为空")
    private Integer orderNo;

    /**
     * 是否必填
     */
    private Integer required;

    /**
     * 是否唯一
     */
    private Integer isOnly;
    @TableField(fill = FieldFill.INSERT)
    private Date createDate;
    @TableField(fill = FieldFill.INSERT)
    private String createUser;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private String editUser;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date editDate;
    /**
     * 是否需要导入
     */
    @TableField(exist = false)
    private boolean needImport;
    //
    /**
     * 分页&排序信息
     */
    @TableField(exist = false)
    private Page page;
    /**
     * 是否是日期
     */
    @TableField(exist = false)
    private boolean isDate;
    /**
     * 是否是数字
     */
    @TableField(exist = false)
    private boolean isNumber;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFieldLength() {
        return fieldLength;
    }

    public void setFieldLength(String fieldLength) {
        this.fieldLength = fieldLength;
    }

    public String getFieldType() {
        return fieldType;
    }

    public void setFieldType(String fieldType) {
        this.fieldType = fieldType;
    }

    public String getReplaceTable() {
        return replaceTable;
    }

    public void setReplaceTable(String replaceTable) {
        this.replaceTable = replaceTable;
    }

    public String getReplaceTableFieldName() {
        return replaceTableFieldName;
    }

    public void setReplaceTableFieldName(String replaceTableFieldName) {
        this.replaceTableFieldName = replaceTableFieldName;
    }

    public String getReplaceTableFieldValue() {
        return replaceTableFieldValue;
    }

    public void setReplaceTableFieldValue(String replaceTableFieldValue) {
        this.replaceTableFieldValue = replaceTableFieldValue;
    }

    public String getReplaceTableDictType() {
        return replaceTableDictType;
    }

    public void setReplaceTableDictType(String replaceTableDictType) {
        this.replaceTableDictType = replaceTableDictType;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public Integer getRequired() {
        return required;
    }

    public void setRequired(Integer required) {
        this.required = required;
    }

    public Integer getIsOnly() {
        return isOnly;
    }

    public void setIsOnly(Integer isOnly) {
        this.isOnly = isOnly;
    }

    @Override
    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public boolean isNeedImport() {
        return needImport;
    }

    public void setNeedImport(boolean needImport) {
        this.needImport = needImport;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getEditUser() {
        return editUser;
    }

    public void setEditUser(String editUser) {
        this.editUser = editUser;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    /**
     * 是否日期格式
     *
     * @return true/false
     */
    public boolean getIsDate() {
        return ImportExportUtil.isDate(this.fieldType);
    }

    /**
     * 是否数字
     *
     * @return true/false
     */
    public boolean getIsNumber() {
        return ImportExportUtil.isInteger(this.fieldType) ||
                ImportExportUtil.isLong(this.fieldType) ||
                ImportExportUtil.isDouble(this.fieldType);
    }

}
