package com.frame.easy.modular.scheduler.controller;

import com.frame.easy.base.controller.BaseController;
import com.frame.easy.result.Tips;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.frame.easy.modular.scheduler.model.SchedulerJob;
import com.frame.easy.modular.scheduler.service.SchedulerJobService;

import javax.validation.Valid;

/**
 * 定时任务 
 *
 * @author TengChong
 * @date 2019-05-11
 */
@Controller
@RequestMapping("/auth/scheduler/job")
public class SchedulerJobController extends BaseController {
    /**
     * view 路径
     */
    private final String PREFIX = "modular/scheduler/job/";

    /**
     * 定时任务  service
     */
    @Autowired
    private SchedulerJobService service;

    /**
     * 列表
     *
     * @return String
     */
    @RequestMapping("list")
    public String list(){
        logger.debug("/auth/scheduler/job/list");
        return PREFIX + "list";
    }

    /**
     * 列表
     *
     * @param object 查询条件
     * @return Tips
     */
    @RequestMapping("select")
    @ResponseBody
    @RequiresPermissions("scheduler:job:select")
    public Tips select(@RequestBody(required = false) SchedulerJob object){
        logger.debug("/auth/scheduler/job/select");
        return Tips.getSuccessTips(service.select(object));
    }
    /**
     * 详情
     *
     * @param id id
     * @return String
     */
    @RequestMapping("/input/{id}")
    @RequiresPermissions("scheduler:job:select")
    public String input(Model model, @PathVariable("id") String id) {
        logger.debug("/auth/scheduler/job/input/" + id);
        model.addAttribute("object", service.input(id));
        return PREFIX + "input";
    }

    /**
     * 新增
     *
     * @return String
     */
    @RequestMapping("/add")
    @RequiresPermissions("scheduler:job:add")
    public String add(Model model) {
        logger.debug("/auth/scheduler/job/add");
        model.addAttribute("object", service.add());
        return PREFIX + "input";
    }
    /**
     * 删除
     *
     * @param ids 数据ids
     * @return Tips
     */
    @RequestMapping("/delete/{ids}")
    @ResponseBody
    @RequiresPermissions("scheduler:job:delete")
    public Tips delete(@PathVariable("ids") String ids) {
        logger.debug("/auth/scheduler/job/delete/" + ids);
        return Tips.getSuccessTips(service.delete(ids));
    }
    /**
     * 保存
     *
     * @param object 表单内容
     * @return Tips
     */
    @RequestMapping("/save/data")
    @ResponseBody
    @RequiresPermissions("scheduler:job:save")
    public Tips saveData(@Valid SchedulerJob object){
        logger.debug("/auth/scheduler/job/save/data");
        return Tips.getSuccessTips(service.saveData(object));
    }

    /**
     * 开启
     *
     * @param id 数据id
     * @return Tips
     */
    @RequestMapping("/start/{ids}")
    @ResponseBody
    @RequiresPermissions("scheduler:job:save")
    public Tips start(@PathVariable("ids") String id) {
        logger.debug("/auth/scheduler/job/start/" + id);
        service.start(id);
        return Tips.getSuccessTips();
    }
    /**
     * 暂停
     *
     * @param id 数据id
     * @return Tips
     */
    @RequestMapping("/pause/{ids}")
    @ResponseBody
    @RequiresPermissions("scheduler:job:save")
    public Tips pause(@PathVariable("ids") String id) {
        logger.debug("/auth/scheduler/job/pause/" + id);
        service.pause(id);
        return Tips.getSuccessTips();
    }

    /**
     * 全部开启
     *
     * @return Tips
     */
    @RequestMapping("/start/all")
    @ResponseBody
    @RequiresPermissions("scheduler:job:save")
    public Tips startAll() {
        logger.debug("/auth/scheduler/job/start/all");
        service.startAll();
        return Tips.getSuccessTips();
    }

    /**
     * 全部暂停
     *
     * @return Tips
     */
    @RequestMapping("/pause/all")
    @ResponseBody
    @RequiresPermissions("scheduler:job:save")
    public Tips pauseAll() {
        logger.debug("/auth/scheduler/job/pause/all");
        service.pauseAll();
        return Tips.getSuccessTips();
    }

}
