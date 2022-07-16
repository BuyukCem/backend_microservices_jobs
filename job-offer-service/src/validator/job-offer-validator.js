/**
 * Check the field title
 * @param title
 * @returns {boolean}
 */
exports.check_title = function check_field_title(title) {
    const regex = /^([A-Za-záàâãéèêíïóôõöúçÿñÁÀÂÃÉÈÍÏÓÔÕÖÚÇŸÑ0-9]['\s\-\'\/,()&:]*)+([\.]?)*$/ig
    return regex.test(title)
}

/**
 * Check the field contract type
 * @param contract_type
 * @returns {boolean}
 */
exports.check_contract_type = function check_field_contract_type(contract_type) {
    const regex = /^([A-Za-záàâãéèêíïóôõöúçÿñÁÀÂÃÉÈÍÏÓÔÕÖÚÇŸÑ][\s\-\'()]*)+([\.]?)*$/ig
    return regex.test(contract_type)
}

/**
 * Check the field sector
 * @param sector
 * @returns {boolean}
 */
exports.check_sector = function check_field_sector(sector) {
    const regex = /^([A-Za-záàâãéèêíïóôõöúçÿñÁÀÂÃÉÈÍÏÓÔÕÖÚÇŸÑ][\s\-\'\/\&]*)+([\.]?)*$/ig
    return regex.test(sector)
}

/**
 * Check the field city
 * @param city
 * @returns {boolean}
 */
exports.check_city = function check_field_city(city) {
    const regex = /^([A-Za-záàâãéèêíïóôõöúçÿñÁÀÂÃÉÈÍÏÓÔÕÖÚÇŸÑ]['\s\-]*)+([\.]?)*$/ig
    return regex.test(city)
}

/**
 * Check the field street
 * @param street
 * @returns {boolean}
 */
exports.check_street = function check_field_street(street) {
    const regex = /^([A-Za-záàâãéèêíïóôõöúçÿñÁÀÂÃÉÈÍÏÓÔÕÖÚÇŸÑ]['\s\-,]*)+([\.]?)*$/ig
    return regex.test(street)
}

/**
 * Check the field country
 * @param country
 * @returns {boolean}
 */
exports.check_country = function check_field_country(country) {
    const regex = /^([A-Za-záàâãéèêíïóôõöúçÿñÁÀÂÃÉÈÍÏÓÔÕÖÚÇŸÑ][\s\-]*)+([\.]?)*$/ig
    return regex.test(country)
}


/**
 * Check the field street number
 * @param street_number
 * @returns {boolean}
 */
exports.check_street_number = function check_field_street_number(street_number) {
    const regex = /^[0-9]{0,5}$/g;
    return regex.test(street_number);
}

/**
 * Check the field salary
 * @param salary
 * @returns {boolean}
 */
exports.check_salary = function check_field_salary(salary) {
    const regex = /^\s*-?[1-9]\d*(\.\d{2})?\s*$/;
    return regex.test(salary);
}

/**
 * Check the field zip code
 * @param zip_code
 * @returns {boolean}
 */
exports.check_zip_code = function check_field_zip_code(zip_code) {
    const regex = /^(^1|[1-9])[0-9]{3,4}$/;
    return regex.test(String(zip_code));
}

/**
 * Check all the descritions
 * @param description
 * @returns {boolean}
 */
exports.check_characters_descriptions = function check_characters_fields_descriptions(description) {
    if (description.length < 20) {
        return false;
    } else return description.length <= 500;
};
