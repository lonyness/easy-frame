package com.frame.easy.modular.sys.service;

import com.frame.easy.common.jstree.JsTree;
import com.frame.easy.common.page.Page;
import com.frame.easy.common.select.Select;
import com.frame.easy.modular.sys.model.SysDepartment;

import java.util.List;

/**
 * 机构管理
 *
 * @author tengchong
 * @date 2018/12/3
 */
public interface SysDepartmentService {
    /**
     * 根据父id获取数据
     *
     * @param pId 父id
     * @return List<JsTree>
     */
    List<JsTree> selectData(String pId);

    /**
     * 根据关键字搜索
     *
     * @param title 关键字
     * @return List<JsTree>
     */
    List<JsTree> search(String title);

    /**
     * 列表
     *
     * @param object 查询条件
     * @return page
     */
    Page select(SysDepartment object);

    /**
     * 详情
     *
     * @param id id
     * @return SysDepartment
     */
    SysDepartment input(String id);

    /**
     * 新增
     *
     * @param pId        上级id
     * @param departType 类型
     * @return SysDepartment
     */
    SysDepartment add(String pId, String departType);

    /**
     * 删除
     *
     * @param ids 要删除的id 1,2,3 或 1
     * @return true/false
     */
    boolean delete(String ids);

    /**
     * 保存
     *
     * @param object 表单内容
     * @return SysDepartment
     */
    SysDepartment saveData(SysDepartment object);

    /**
     * 根据机构类型id获取机构数量
     *
     * @param typeIds 1,2,3 或 1
     * @return int
     */
    int selectCountByTypeIds(String typeIds);

    /**
     * 更新机构类型代码
     *
     * @param oldCode 原代码
     * @param newCode 新代码
     * @return true/false
     */
    boolean updateDepartmentTypeCode(String oldCode, String newCode);

    /**
     * 新增/修改页面获取机构类型option
     *
     * @param pId        上级id
     * @param departType 类型
     * @return option
     */
    List<Select> selectDepartmentTypeOption(String pId, String departType);

    /**
     * 新增/修改页面获取父机构option
     *
     * @param pId 上级机构id
     * @param departType 机构类型
     * @return List<Select>
     */
    List<Select> selectUpDepartmentOption(String pId, String departType);
}