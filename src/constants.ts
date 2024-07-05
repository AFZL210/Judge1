const constants = {
    SUPPORTED_LANGUAGES: ['cpp', 'js', 'py'],
    LANGUAGES_REQUIRE_BUILD: ['cpp'],
    CODE_QUEUE_NAME: process.env.CODE_QUEUE_NAME!,
    TLE: 3000
}

export default constants;