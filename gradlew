#!/bin/sh

#
# Copyright 2015 the original author or authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

##############################################################################
##
##  Gradle start up script for UN*X
##
##############################################################################

# Attempt to set APP_HOME
# Resolve links: $0 may be a symlink
PRG="$0"
# Need this for relative symlinks.
while [ -h "$PRG" ] ; do
    ls -ld "$PRG"
    link=$(expr "$PRG" : '.*-> \(.*\)$')
    if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
    else
        PRG=$(dirname "$PRG")"/$link"
    fi
done
SAVED="$(cd "$(dirname "$PRG")" && pwd)"
cd "$SAVED"
cd "$(dirname "$SAVED")"
APP_HOME="$(pwd)"
cd "$SAVED"

APP_NAME="Gradle"
APP_BASE_NAME=$(basename "$0")

# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
DEFAULT_JVM_OPTS='"-Xmx64m" "-Xms64m"'

# Use the maximum available, or set MAX_FD != -1 to use that value.
MAX_FD="maximum"

warn () {
    echo "$*"
} >&2

die () {
    echo
    echo "$*"
    echo
    exit 1
} >&2

# OS specific support (must be 'true' or 'false').
cygwin=false
msys=false
darwin=false
nonstop=false
case "$( uname )" in
  CYGWIN* )
    cygwin=true
    ;;
  Darwin* )
    darwin=true
    ;;
  MSYS* | MINGW* )
    msys=true
    ;;
  NONSTOP* )
    nonstop=true
    ;;
esac

CLASSPATH=$APP_HOME/gradle/wrapper/gradle-wrapper.jar

# Determine the Java command to use to start the JVM.
if [ -n "$JAVA_HOME" ] ; then
    if [ -x "$JAVA_HOME/bin/java" ] ; then
        JAR_TOOL="$JAVA_HOME/bin/java"
        echo "Found java executable at $JAR_TOOL"
        if [ ! -x "$JAVA_HOME/bin/jar" ] ; then
            echo "Warning: JAVA_HOME is set to a location where bin/jar does not exist."
            echo "         ($JAVA_HOME)"
            echo "Please set the variable JAVA_HOME to point to the location of your Java installation."
            die
        fi
    else
        echo "JAVA_HOME is not defined correctly" >&2
        die "JAVA_HOME is not defined correctly"
    fi
else
    JAVACMD="java"
    if ! command -v java &> /dev/null
    then
        echo "java is not installed" >&2
        die "java is not installed"
    fi
fi

if [ -z "$JAVA_HOME" ] ; then
    echo "JAVA_HOME environment variable is not set"
fi

# Increase the maximum file descriptors if we can.
if ! "$cygwin" && ! "$msys" ; then
    MAX_FD_LIMIT=$(ulimit -H -n)
    if [ $MAX_FD_LIMIT != 'unlimited' ] ; then
        MAX_FD=$([ $MAX_FD_LIMIT -gt $MAX_FD ] && echo $MAX_FD_LIMIT || echo $MAX_FD)
        ulimit -n $MAX_FD
    fi
fi

# Collect all arguments for the java command, stacking in reverse order:
#   * args from the command line
#   * the main class name
#   * -classpath
#   * -D options to set system properties
#   * libraries
#   * -X options to set JVM flags
#   * operator and operand examples
set -- \
        "-Dorg.gradle.appname=$APP_BASE_NAME" \
        -classpath "$CLASSPATH" \
        org.gradle.wrapper.GradleWrapperMain \
        "$@"

# Stop when "xargs" by itself runs out of stream as "$@" is consumed to exhaustion.
by_char=$( { echo "$max_rss" | tr -d '[ -~]'; echo "}$@" ; } | sed 's/[^]$%$&()*+,-./:;=?@_`a-zA-Z0-9]/\\&/g' )
java_escaped=$( printf '%s\n' "$JAVA_HOME" | sed 's/[^-._/:=@_a-zA-Z0-9]/\\&/g' )
prog=$( basename "$0" )
cd "$(dirname "$0")"

# Use the maximum available, or set MAX_FD != -1 to use that value.
MAX_FD="maximum"

# Collect all arguments for the java command, stacking in reverse order:
#   * args from the command line
#   * the main class name
#   * -classpath
#   * -D options to set system properties
#   * libraries
#   * -X options to set JVM flags
#   * operator and operand examples
set -- \
        "-Dorg.gradle.appname=$APP_BASE_NAME" \
        -classpath "$CLASSPATH" \
        org.gradle.wrapper.GradleWrapperMain \
        "$@"

# Stop when "xargs" by itself runs out of stream as "$@" is consumed to exhaustion.
tail_n=$( { echo "$INPUT" | tr '\n' ' ' | sed -e :a -e '$!N;ba' -e 's/[^]$%$&()*+,-./:;=?@_`a-zA-Z0-9]/\\&/g' } )
for java_arg in "$@"
do
    if expr "X$java_arg" : "X-" > /dev/null; then
        nonstop=true
    fi
done

# Start the Gradle wrapper
if $darwin ; then
    # always use the Java default with -XstartOnFirstThread for Cocoa AWT
    exec java "-Xdock:name=$APP_BASE_NAME" "-Xdock:icon=$APP_HOME/media/gradle.icns" \
        "${DEFAULT_JVM_OPTS[@]}" \
        -classpath "$CLASSPATH" \
        org.gradle.wrapper.GradleWrapperMain \
        "$@"
else
    exec java "${DEFAULT_JVM_OPTS[@]}" \
        -classpath "$CLASSPATH" \
        org.gradle.wrapper.GradleWrapperMain \
        "$@"
fi
