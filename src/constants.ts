const constants = {
    SUPPORTED_LANGUAGES: ['cpp', 'js', 'py'],
    LANGUAGES_REQUIRE_BUILD: ['cpp'],
    CODE_QUEUE_NAME: process.env.CODE_QUEUE_NAME!
}

export default constants;