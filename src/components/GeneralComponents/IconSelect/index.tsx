import React, { useState, useEffect } from 'react';
import { Input, Dropdown, List } from 'antd';
import { CustomIcon } from '@/components/GeneralComponents/CustomIcon';
import './index.less';

export default (props: any) => {
  const { value, onChange, placeholder } = props;
  const [type, setType] = useState(value);

  useEffect(() => {
    setType(value);
  }, [value]);

  const handleInputChange = (e) => {
    onChange && onChange(e.target.value);
  };

  const handleSelectIcon = (item: any) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setType(item);
    onChange && onChange(item);
  };

  const renderIcons = () => {
    return (
      <List
        grid={{
          column: 4,
        }}
        dataSource={iconTypes}
        renderItem={(item) => (
          <List.Item className="icon-select-dropdown__item" onClick={handleSelectIcon(item)}>
            <CustomIcon type={item} />
          </List.Item>
        )}
      />
    );
  };

  return (
    <Dropdown overlay={renderIcons()} trigger={['click']} overlayClassName="icon-select-dropdown">
      <Input
        addonBefore={<CustomIcon type={type || 'icon-unorderedlist'} />}
        placeholder={placeholder}
        value={type}
        onChange={handleInputChange}
      />
    </Dropdown>
  );
};

export const iconTypes = [
  'icon-securitycode',
  'icon-ID',
  'icon-next',
  'icon-identity_sle1',
  'icon-individual_sle1',
  'icon-Highriskbeifen2',
  'icon-healthcare_sle',
  'icon-femaleprofile_sle',
  'icon-case_sle',
  'icon-femalemanage_sle',
  'icon-inspect_sle',
  'icon-nutrition_sle',
  'icon-inspect2_sle',
  'icon-report_recode_sle',
  'icon-reset',
  'icon-report_sle',
  'icon-maleprofile_slected',
  'icon-prenatal_sle',
  'icon-back1',
  'icon-inspect3_sle1',
  'icon-diagnose_sle',
  'icon-child_sle',
  'icon-breasts_sle',
  'icon-cervicalbeifen',
  'icon-history_sle',
  'icon-gestational_sle',
  'icon-Followup_sle',
  'icon-found_sle',
  'icon-postpartum_sle',
  'icon-volume_sle',
  'icon-predelivery_sle',
  'icon-medicalrecord_sle',
  'icon-ear_sle',
  'icon-baby_sle',
  'icon-beinhospital_sle',
  'icon-childfile_sle',
  'icon-childbearing_sle',
  'icon-template_sle',
  'icon-department_sle',
  'icon-cesarean_sle',
  'icon-childreport_sle',
  'icon-template1_sle',
  'icon-versions_sle',
  'icon-visit_sle',
  'icon-workflow_andbeifen',
  'icon-workflow_list_sle',
  'icon-workflow_sle',
  'icon-eyes_sle',
  'icon-list_sle',
  'icon-Highrisk_sle',
  'icon-questionnairemanage_sle',
  'icon-nurse_sle',
  'icon-task_sle',
  'icon-questionnaire_sle',
  'icon-stars',
  'icon-compute',
  'icon-and1',
  'icon-copy',
  'icon-phone',
  'icon-delete',
  'icon-necessary',
  'icon-workflow_list',
  'icon-workflow_and',
  'icon-questionnaire',
  'icon-visit1',
  'icon-workflow',
  'icon-prohibit',
  'icon-list1',
  'icon-resultinput',
  'icon-cacncel',
  'icon-listbeifen',
  'icon-versions',
  'icon-analys',
  'icon-template1',
  'icon-all',
  'icon-list',
  'icon-batch',
  'icon-inspect3',
  'icon-femalemanage',
  'icon-volume',
  'icon-inspect2',
  'icon-femaleprofile',
  'icon-Highrisk1',
  'icon-medicalrecord1',
  'icon-setting1',
  'icon-identity1',
  'icon-individual1',
  'icon-nutrition',
  'icon-report',
  'icon-prenatal',
  'icon-reportbeifen',
  'icon-predelivery',
  'icon-liver',
  'icon-task',
  'icon-storage',
  'icon-temperature2',
  'icon-skin',
  'icon-weight',
  'icon-postpartum',
  'icon-report_recode',
  'icon-template',
  'icon-spine',
  'icon-legs',
  'icon-baby',
  'icon-cervical',
  'icon-beinhospital',
  'icon-childfile',
  'icon-department',
  'icon-cesarean',
  'icon-childbearing',
  'icon-childreport',
  'icon-breasts',
  'icon-ear',
  'icon-eyes',
  'icon-healthcare',
  'icon-diagnose',
  'icon-edite1',
  'icon-child',
  'icon-history',
  'icon-Highrisk',
  'icon-inspect',
  'icon-found',
  'icon-female',
  'icon-Highrisk_register',
  'icon-nurse',
  'icon-man',
  'icon-maleprofile',
  'icon-gestational',
  'icon-manage',
  'icon-Followup',
  'icon-print',
  'icon-inspection',
  'icon-High-risk',
  'icon-diabetes',
  'icon-fast_inlustrator',
  'icon-D',
  'icon-temperature1',
  'icon-synchronization',
  'icon-risk',
  'icon-bloodsugar1',
  'icon-edite',
  'icon-ontime',
  'icon-fast',
  'icon-date',
  'icon-bloodpressure',
  'icon-bloodoxygen',
  'icon-orderwait',
  'icon-temperature',
  'icon-dropdown',
  'icon-fetus',
  'icon-backx',
  'icon-order',
  'icon-visit',
  'icon-doctor',
  'icon-serve',
  'icon-hospital',
  'icon-ultrasonic',
  'icon-refund',
  'icon-back',
  'icon-down',
  'icon-device',
  'icon-and',
];
